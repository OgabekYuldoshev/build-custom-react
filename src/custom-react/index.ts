import { createElement } from "./createElement";
import type { EffectHook, ElementType, Fiber, UseStateAction } from "./types";
import { isEvent, isGone, isNew, isProperty } from "./utils";

let nextUnitOfWork: Fiber | null = null;
let currentRoot: Fiber | null = null;
let wipRoot: Fiber | null = null;
let wipFiber: Fiber | null = null;
let hookIndex: number = 0;
let deletions: Fiber[] = [];

function createDom(fiber: Fiber) {
  if (fiber.tagName instanceof Function) return;

  const dom =
    fiber.tagName == "#text"
      ? document.createTextNode("")
      : document.createElement(fiber.tagName);

  updateDom(dom as HTMLElement, {}, fiber.props);

  return dom;
}

function performUnitOfWork(fiber: Fiber): Fiber | null {
  const isFunctionComponent = fiber.tagName instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}

function workLoop(deadline: IdleDeadline) {
  let shouldYeld = false;

  while (nextUnitOfWork && !shouldYeld) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYeld = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function updateDom(
  dom: HTMLElement,
  prevProps: Record<string, any>,
  nextProps: Record<string, any>
) {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((key) => {
      const eventName = key.toLowerCase().substring(2);
      dom.removeEventListener(eventName, prevProps[key]);
    });

  // Remove old props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((key) => {
      (dom as any)[key] = "";
    });

  // Add new or changed props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((key) => {
      (dom as any)[key] = nextProps[key];
    });

  // Add new or changed listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((key) => {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[key]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot?.child);
  currentRoot = wipRoot;

  wipRoot = null;
}

function commitWork(fiber: Fiber | null | undefined) {
  if (!fiber) {
    return;
  }

  fiber.hooks
    .filter(
      (h) => "effect" in h && typeof h.effect === "function" && h.hasChanged
    )
    .forEach((hook) => {
      const cleanup = hook.effect();
      if (typeof cleanup === "function") {
        hook.cleanup = cleanup;
      }
    });

  let domParentFiber = fiber.parent;

  while (!domParentFiber?.dom) {
    domParentFiber = domParentFiber?.parent!;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "CREATE" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  }

  if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom as HTMLElement, fiber.oldVersion?.props!, fiber.props);
  }

  if (fiber.effectTag === "DELETE") {
    commitDeletion(fiber, domParent as HTMLElement);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber: Fiber, domParent: HTMLElement) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child!, domParent);
  }
}

function render(element: ElementType, container: HTMLElement) {
  wipRoot = {
    tagName: "",
    parent: null,
    child: null,
    sibling: null,
    dom: container,
    hooks: [],
    props: {},
    children: [element],
    oldVersion: currentRoot,
    effectTag: null,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function updateFunctionComponent(fiber: Fiber) {
  if (typeof fiber.tagName === "string") return;
  wipFiber = fiber;
  hookIndex = 0;
  const children = [fiber.tagName(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)!;
  }

  reconcileChildren(fiber, fiber.children);
}

function reconcileChildren(fiber: Fiber, elements: ElementType[]) {
  let index = 0;
  let oldFiber = fiber?.oldVersion! && fiber.oldVersion.child!;
  let prevSibling = null;

  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber: Fiber | null = null;

    const isSameTagName =
      oldFiber && element && element.tagName === oldFiber.tagName;

    if (isSameTagName) {
      newFiber = {
        tagName: oldFiber.tagName,
        props: element.props,
        dom: oldFiber.dom,
        parent: fiber,
        oldVersion: oldFiber,
        hooks: [],
        sibling: null,
        children: element.children,
        child: null,
        effectTag: "UPDATE",
      } satisfies Fiber;
    }

    if (element && !isSameTagName) {
      newFiber = {
        tagName: element.tagName,
        props: element.props,
        dom: null,
        parent: fiber,
        oldVersion: null,
        effectTag: "CREATE",
        hooks: [],
        sibling: null,
        children: element.children,
        child: null,
      } satisfies Fiber;
    }

    if (oldFiber && !isSameTagName) {
      oldFiber.effectTag = "DELETE";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling!;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevSibling!.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function useState<T>(initial: T): [T, (action: UseStateAction<T>) => void] {
  const oldHook = wipFiber?.oldVersion && wipFiber?.oldVersion.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [] as UseStateAction<T>[],
  };

  const actions = oldHook ? oldHook.queue : [];

  actions.forEach((action: UseStateAction<T>) => {
    hook.state = action(hook.state);
  });

  const setState = (action: UseStateAction<T>) => {
    hook.queue.push(action);

    wipRoot = {
      tagName: "",
      props: currentRoot?.props!,
      children: currentRoot!.children,
      dom: currentRoot!.dom,
      parent: null,
      sibling: null,
      child: null,
      hooks: [],
      oldVersion: currentRoot!,
      effectTag: null,
    };

    deletions = [];
    nextUnitOfWork = wipRoot;
  };

  wipFiber?.hooks.push(hook);
  hookIndex += 1;

  return [hook.state, setState];
}

function useEffect(effect: () => void | (() => void), deps?: any[]) {
  const oldHook: EffectHook | undefined =
    wipFiber?.oldVersion?.hooks[hookIndex];
  const hasChanged =
    !oldHook || !deps || deps.some((dep, i) => dep !== oldHook.deps?.[i]);

  const hook: EffectHook = {
    effect,
    deps,
    cleanup: hasChanged && oldHook?.cleanup ? oldHook.cleanup : undefined,
    hasChanged,
  };

  wipFiber?.hooks.push(hook);
  hookIndex++;
}

export default {
  render,
  createElement,
  useState,
  useEffect,
};
