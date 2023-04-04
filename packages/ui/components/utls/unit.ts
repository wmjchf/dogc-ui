export const handleUnit = (value?: number | string) => {
  if (!value) return "unset";
  const type = typeof value;
  if (type === "string") {
    return value;
  }
  if (type === "number") {
    return `${value}px`;
  }
};
