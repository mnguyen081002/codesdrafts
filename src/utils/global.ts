export const getArrayDepth = (value: any[]) =>
  Array.isArray(value) ? 1 + Math.max(0, ...value.map(getArrayDepth)) : 0;