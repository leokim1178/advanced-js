// 다음과 같은 push, pop, shift, unshift 를 순수 함수로 작성하시오.
// (단, 입력값은 다음 예시로 한정함)
const assert = require('assert');
// function push(array, …args) {}
const arr = [1, 2, 3, 4];

const push = (array,...args) =>[...array, ...args]
// const pop = (array,count=1) => {
//     const result =array.slice(array.length-count,array.length)
//     return result.length ===1 ?result[0]: result
// }
const pop = (array,count=1)=> count===1?array.at(-1):array.slice(-count)
const unshift = (array, ...args )=>[...args,...array]
// const shift = (array,count=1)=>{
//     const result1 = array.slice(0,count)
//     const result2 = array.slice(count,array.length)
//     return [result1,result2]
// }
const shift = (array,count=1)=>([array.slice(0,count),array.slice(count,array.length)])

assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]); 
assert.deepStrictEqual(pop(arr), 4); 
assert.deepStrictEqual(pop(arr, 2), [3, 4]);    // 2개 팝!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [[1], [2, 3, 4]]); // [shift되는 원소들, 남은 원소들]
assert.deepStrictEqual(shift(arr, 2), [[1, 2], [3, 4]]); // 2개 shift
assert.deepStrictEqual(arr, [1, 2, 3, 4]); 