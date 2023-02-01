export const convertStringToId = (str: string): string => {
  return str
    .replace(/[\W_]+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
};

export const removeHttps = (linkStr: string): string => {
  return linkStr.replace(/^https?:\/\//, "");
};
