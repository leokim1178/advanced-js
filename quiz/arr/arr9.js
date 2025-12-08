// 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.

const assert = require("assert");

// const range = (start, end, step = start > end ? -1 : 1) => {
//   let result = step === 0 || start === end ? [start] : [];
//   if (start === end || (start === 0 && !end)) return [start];

//   if (end === undefined) {
//     for (
//       let i = start > 0 ? 1 : -1;
//       start > 0 ? i <= start : i >= start;
//       start > 0 ? i++ : i--
//     ) {
//       start > 0 ? result.push(i) : result.unshift(i);
//     }
//   } else {
//     for (
//       let i = start;
//       step !== 0 && step > 0 ? i <= end : end <= i;
//       i = i + step
//     ) {
//       result.push(i);
//     }
//   }

//   return result;
// };

// const range = (start, end, step = start > end ? -1 : 1) => {
//   let result = [];
//   console.log(start, end, step);
//   if (step === 0 || start === end) return [start];
//   if (end === undefined) {
//     if (start > 0) {
//       end = start;
//       start = 1;
//     } else if (start < 0) {
//       end = -1;
//     } else {
//       return [0];
//     }
//   }
//   if ((start - end) * step > 0) return [];

//   for (let i = start; i <= end; i = i + step) {
//     result.push(i);
//   }

//   return result;
// };

const range = (start, end, step = start > end ? -1 : 1) => {
  if (step === 0 || start === end) return [start];
  if ((start - end) * step > 0) return [];
  const tempStart = start;
  end = end ?? (start > 0 ? ((start = 1), tempStart) : start < 0 ? -1 : 0);
  const result = [];

  for (let i = start; start > end ? i >= end : i <= end; i = i + step) {
    result.push(i);
  }

  return result;
};

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(
  range(100),
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100,
  ]
);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(1, 5, -1), []);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);
assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
