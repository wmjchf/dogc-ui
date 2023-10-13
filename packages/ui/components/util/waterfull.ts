export function findMinColumnIndex(columns: Array<number>): number {
  let minIndex = 0;
  let minNumber = columns[0];
  columns.forEach((value, index) => {
    if (value < minNumber) {
      minNumber = value;
      minIndex = index;
    }
  });
  return minIndex;
}
export function findMaxColumnValue(columns: Array<number>): number {
  let maxNumber = columns[0];
  columns.forEach((value) => {
    if (value > maxNumber) {
      maxNumber = value;
    }
  });
  return maxNumber;
}
