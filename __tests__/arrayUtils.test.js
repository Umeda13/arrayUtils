import fc from "fast-check";
import {
  findCommonElements,
  groupByParity,
  removeDuplicates,
  sortNumbers,
  sumPositiveNumbers
} from "../src/arrayUtils.js";

describe('Array utils', () => {
  test('removeDuplicates', () => {
    fc.assert(
      fc.property(fc.array(fc.nat()), fc.array(fc.string()), (numbers, strings) => {
        expect(removeDuplicates(numbers)).toEqual([...new Set(numbers)]);
        expect(removeDuplicates(strings)).toEqual([...new Set(strings)]);
      })
    );

    const arr = [];
    expect(removeDuplicates(arr)).not.toBe(arr);
  });

  test('sortNumbers', () => {
    const sort = (numbers) => [...numbers].sort((a, b) => a - b);

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(sortNumbers(numbers)).toEqual(sort(numbers));
      })
    );

    const arr = [];
    expect(sortNumbers(arr)).not.toBe(arr);
  });

  test('sumPositiveNumbers', () => {
    const sum = (arr) => arr.filter((n) => n > 0).reduce((sum, n) => sum + n, 0);

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(sumPositiveNumbers(numbers)).toEqual(sum(numbers));
      })
    );
  });

  test('groupByParity', () => {
    const group = (arr) => arr.reduce((acc, n) => {
      const key = n % 2 === 0 && 'even' || 'odd';
      acc[key].push(n);
      return acc;
    }, { even: [], odd: [] })

    fc.assert(
      fc.property(fc.array(fc.nat()), (numbers) => {
        expect(groupByParity(numbers)).toEqual(group(numbers));
      })
    );
  });

  test('findCommonElements', () => {
    const fn = (arr1, arr2) => {
      const set2 = new Set(arr2);
      return arr1.filter(item => set2.has(item));
    };

    fc.assert(
      fc.property(
        fc.array(fc.nat()),
        fc.array(fc.nat()),
        fc.array(fc.string()),
        fc.array(fc.string()),
        (nums1, nums2, strs1, strs2) => {
          expect(findCommonElements(nums1, nums2)).toEqual(fn(nums1, nums2));
          expect(findCommonElements(strs1, strs2)).toEqual(fn(strs1, strs2));
        }
      )
    );

    const arr1 = [];
    const arr2 = [];
    expect(findCommonElements(arr1, arr2)).not.toBe(arr1);
    expect(findCommonElements(arr1, arr2)).not.toBe(arr2);
  });
});