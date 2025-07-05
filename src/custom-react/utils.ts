export const isEvent = (key: string) => key.startsWith("on");
export const isNew =
  (prev: Record<string, any>, next: Record<string, any>) => (key: string) =>
    prev[key] !== next[key];

export const isProperty = (key: string) => !isEvent(key);

export const isGone =
  (next: Record<string, any>) => (key: string) =>
    !(key in next);
