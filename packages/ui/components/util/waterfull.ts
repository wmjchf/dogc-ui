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
