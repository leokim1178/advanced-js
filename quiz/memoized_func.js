// 만약 memoizedFactorial 함수에 큰 수를 넣으면 CallStack이 Overflow 발생합니다.(RangeError: Maximum call stack size exceeded)

// 아래와 같이 큰 수를 입력하여 Stack Overflow가 발생하여도, 결과가 나오도록 함수를 작성하려면?

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
console.log(memoizedFactorial(1000)); // Stack Overflow가 발생하지 않고 결과가 나와야 한다
// 위 결과는 Infinity가 나온다. 이유는 JS에서 표현할 수 있는 숫자의 한계 때문이다
// console.log(memoizedFactorial(5000)); // RangeError: Maximum call stack size exceeded
// 위 결과는 Stack Overflow가 발생한다. 이유는 JS의 Call Stack 한계 때문이다
// 이를 해결하기 위해서는 재귀를 반복문으로 바꾸거나, 꼬리 재귀 최적화(Tail Call Optimization)를 지원하는 언어를 사용해야 한다
// 하지만 JS는 꼬리 재귀 최적화를 지원하지 않는다
// 따라서 JS에서 큰 수에 대해 팩토리얼을 계산하려면 BigInt를 사용하거나, 반복문으로 작성하는 방법을 사용해야 한다
// BigInt를 사용한 예시
function bigIntFactorial(n){
    let result = 1n; // BigInt 초기화
    for (let i = 2n; i <= BigInt(n); i++){
        result *= i;
    }
    return result;
}

console.log(bigIntFactorial(1000)); // BigInt로 계산된 팩토리얼 결과
console.log(bigIntFactorial(5000)); // BigInt로 계산된 팩토리얼 결과
