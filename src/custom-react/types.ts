export type ElementType = {
  tagName: string;
  props: Record<string, any>;
  children: ElementType[];
};

type EffectTag = "CREATE" | "UPDATE" | "DELETE";

export type Fiber = {
  tagName: ((props: Record<string, any>) => ElementType) | string;
  hooks: any[],
  props: Record<string, any>;
  children: ElementType[];
  dom: HTMLElement | Text | null;
  parent: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  oldVersion: Fiber | null;
  effectTag: EffectTag | null;
};
