// 범용 memoized 함수를 만들어보자

function memoized(fn){
    const memoizedTable = {};
    return function inner(k){
        return memoizedTable[k] 
            || (memoizedTable[k] = fn(k));
    }
}

const memoizedFactorial = memoized(function factorial(n){
    if (n === 1) return 1;
    return n * memoizedFactorial(n - 1);
});
// 위의 실행문을 분석해보자
// memoizedFactorial(3)이 호출되면 inner 함수가 호출된다
// inner 함수 내의 fn()은 factorial 함수가 될 것이다
// fn(3)이 호출되면 내부에서 memoizedFactorial(2)가 호출된다
// 다시 inner 함수가 호출된다
// inner 함수 내의 fn()은 여전히 factorial 함수가 될 것이다
// fn(2)가 호출되면 내부에서 memoizedFactorial(1)가 호출된다
// 다시 inner 함수가 호출된다
// inner 함수 내의 fn()은 여전히 factorial 함수가 될 것이다
// fn(1)이 호출되면 1이 반환된다    
// 이후에 2 * 1, 3 * 2가 차례대로 계산되면서 최종 결과가 반환된다
// 이 과정에서 동일한 입력에 대해 여러번 계산하는 비효율성이 제거된다


console.log(memoizedFactorial(3));
console.log(memoizedFactorial(5));