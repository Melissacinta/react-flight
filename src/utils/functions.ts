export const convertUnixToDate = (num: number) => {
  return new Date(num * 1000);
};
