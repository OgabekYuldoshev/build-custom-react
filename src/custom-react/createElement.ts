import type { ElementType } from "./types";

export function createElement(
  tagName: string,
  props: Record<string, any> | null,
  ...children: Array<ElementType | string>
): ElementType {
  return Object.assign(
    {},
    {
      tagName,
      props: props ?? {},
      children: children.map((child) =>
        typeof child === "string" ? createTextElement(child) : child
      ),
    }
  );
}

export function createTextElement(text: string): ElementType {
  return Object.assign(
    {},
    {
      tagName: "#text",
      props: {
        nodeValue: text,
      },
      children: [],
    }
  );
}
