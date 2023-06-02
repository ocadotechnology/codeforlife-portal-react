export const mergeArraysNoDuplicates: (
  arr1: string[] | number[],
  arr2: number[] | string[]
) => any[] = (arr1, arr2) => {
  const elementsTracking: any = {};
  const mergedArray: any[] = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!elementsTracking.arr1[i] && !elementsTracking[arr2[i]]) {
      mergedArray.push(arr1[i]);
      mergedArray.push(arr2[i]);
      elementsTracking[arr1[i]] = true;
      elementsTracking[arr2[i]] = true;
    }
  }
  return mergedArray;
};

const arr1 = [4, 4, 1, 2, 3, 6, 7];
const arr2 = [5, 4, 3, 1, 1, 2, 4];

console.log(mergeArraysNoDuplicates(arr1, arr2));
