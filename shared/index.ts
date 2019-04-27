export const textTruncate = (
  str: string,
  length: number = 0,
  ending: string = ""
) => {
  if (length === 0) {
    length = 100;
  }
  if (ending === "") {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};
