// 다음과 같은 deleteArray를 순수 함수로 작성하시오.
const assert = require('assert');

const arr = [1, 2, 3, 4];
// console.log(arr.splice(0,2))

// const deleteArray = (array,start,end)=>end? array.toSpliced(start,end-start): array.toSpliced(start)
const deleteArray = (array,start,end)=>array.filter((_,i)=> i<start || i>=end)

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);    // 2부터 끝까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]); // 1부터 3까지 지우고 나머지 리턴
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

const deleteArray2 = (array,startIdxOrKey,endIdxOrKey)=>{
    if(typeof startIdxOrKey ==='number')
        return array.filter((_,i)=> i<startIdxOrKey || i>=endIdxOrKey)
    else return array.filter((a)=> a[startIdxOrKey]!== endIdxOrKey)
}

assert.deepStrictEqual(deleteArray2(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray2(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray2(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray2(users, 'name', 'Lee'), [Hong, Kim]);


const deleteArray2Better = (array,startIdxOrKey,endIdxOrKey)=>{
    const cb = typeof startIdxOrKey ==='number'
    ? (_,i)=> i<startIdxOrKey || i>=endIdxOrKey
    : (a)=> a[startIdxOrKey]!== endIdxOrKey
    return array.filter(cb)
}



assert.deepStrictEqual(deleteArray2Better(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray2Better(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray2Better(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray2Better(users, 'name', 'Lee'), [Hong, Kim]);
