const assert = require( "node:assert" );


// ✅ 가장 효율적인 방법: 반복문 버전
// - 시간 복잡도: O(n)
// - 공간 복잡도: O(n) (Map만 사용)
// - 스택 오버플로우 위험 없음
// - 실무에서 권장되는 방식
function twoSum(nums,target){
    const map = new Map()
    for(let i=0; i<nums.length; i++){
        let targetIdx = map.get(target-nums[i])
        if(targetIdx !==undefined &&targetIdx !==i){
            return [targetIdx,i]
        }
        map.set(nums[i],i)
    }
}


assert.deepEqual(twoSum([2,7,11,15],9),[0,1])
assert.deepEqual(twoSum([3,2,4],6),[1,2])
assert.deepEqual(twoSum([3,3],6),[0,1])


// 재귀 버전
// - 시간 복잡도: O(n)
// - 공간 복잡도: O(n) (call stack + Map)
// - 반복문 버전과 성능은 동일하지만 스택 공간 추가 사용
// - 깊은 재귀 시 스택 오버플로우 위험 (큰 배열에서 문제)
// - 학습용으로는 좋지만 실무에서는 비권장
function twoSumRecur(nums,target,i=0,map=new Map()){
    
    let targetIdx= map.get(target-nums[i])
    if(targetIdx!==undefined &&targetIdx!==i){
        return [targetIdx,i]
    }
    map.set(nums[i],i)
    return twoSumRecur(nums,target,i+1,map)

}

assert.deepEqual(twoSumRecur([2,7,11,15],9),[0,1])
assert.deepEqual(twoSumRecur([3,2,4],6),[1,2])
assert.deepEqual(twoSumRecur([3,3],6),[0,1])


// ❌ Memoized 버전 (Two Sum에서는 비효율적)
// - 시간 복잡도: O(n)
// - 공간 복잡도: O(n²) (call stack + Map + cache Map)
// - JSON.stringify 오버헤드 추가
// - 문제점:
//   1. Two Sum은 일회성 호출이 대부분 → 캐시 히트율 0%
//   2. 재귀 중간 단계마다 i와 map이 달라져 캐시 키가 매번 다름 → 캐싱 무의미
//   3. Map 객체는 JSON.stringify 시 {}가 되어 구분 불가
// - Memoization이 유용한 경우: 피보나치처럼 같은 입력이 반복 계산되는 경우
// - 이 문제에서는 오버헤드만 증가하여 성능 저하
const  memoizedTwoSum = memoized(
    (nums,target,i=0,map=new Map())=>{

        let targetIdx= map.get(target-nums[i])
        if(targetIdx!==undefined &&targetIdx!==i){
            return [targetIdx,i]
        }
        map.set(nums[i],i)
        return memoizedTwoSum(nums,target,i+1,map)
    }
)


function memoized(fn){
    const cache =new Map()
    return (...args)=>{
        console.log('args:',args) // [ [ 2, 7, 11, 15 ], 9 ]
        console.log('...args:',...args) // [ 2, 7, 11, 15 ] 9
        // args: rest parameter로 모든 인자를 배열로 수집한 결과 - 배열 자체
        // ...args: spread operator로 배열의 iterator를 순회하며 각 원소를 펼친 결과 - 개별 값들
        const key = JSON.stringify(args)
        if(cache.has(key)){
            return cache.get(key)
        }
        // fn(...args): spread operator가 배열을 iterable로 취급하여
        // iterator 프로토콜을 사용해 각 원소를 순차적으로 꺼내서 개별 매개변수로 전달
        // 만약 fn(args)로 호출하면 fn은 배열 하나를 받게 되어 시그니처가 맞지 않음
        // 예: fn([배열], 9, 0, Map) (X) → fn(배열, 9, 0, Map) (O)
        const result = fn(...args)
        cache.set(key,result)
        return result
    }
}

assert.deepEqual(memoizedTwoSum([2,7,11,15],9),[0,1])
assert.deepEqual(memoizedTwoSum([3,2,4],6),[1,2])
assert.deepEqual(memoizedTwoSum([3,3],6),[0,1])