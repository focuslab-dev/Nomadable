export const clearFloatNumber = (floatNum: number, decimalPoint: number) => {
  const dec = decimalPoint || 1000;
  return Math.round(floatNum * dec) / dec;
};

export const getAverage = (arr: number[]): number => {
  const sum = arr.reduce(
    (partialSum: number, item: number) => partialSum + item
  );

  const average = sum / arr.length;
  return average;
};
