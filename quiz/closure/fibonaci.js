// 피보나치 수열을 

const assert = require( "node:assert" )

// 1) Loop를 이용하여 작성하시오.
let loopRunCount=0;
function loopFibonacci(n){
    let result =0
    let arr=[]

    for(let i=0; i<=n;i++){
    loopRunCount++;

        if(i<2) {
            result = i
        }else{
            result= arr[i-2]+arr[i-1]
        }
        arr.push(result)
    }
    return result
}

assert.equal(loopFibonacci(5),5);
assert.equal(loopFibonacci(7),13);
assert.equal(loopFibonacci(30),832040);

let loopFibonacciAnswerRunCount=0;
function loopFibonacciAnswer(n){
    if(n<=1)return n;
    // let prev = 0;
    // let curr =1;
    let [prev,curr]= [0,1]
    for( let i=2; i<=n; i++){
        loopFibonacciAnswerRunCount++;
        // let t= prev
        // prev = curr;
        // curr = t+curr;
        [prev,curr]= [curr,prev+curr]
    }
    
    return curr
}

assert.equal(loopFibonacciAnswer(5),5);
assert.equal(loopFibonacciAnswer(7),13);
assert.equal(loopFibonacciAnswer(30),832040);

// 2) 순수 재귀를 이용하여 작성하시오.
let recurRunCount=0;

function recurFibonacci(n){
    recurRunCount++;
    if(n<=1) return n;
    return recurFibonacci(n-2)+recurFibonacci(n-1)
}

assert.equal(recurFibonacci(5),5);
assert.equal(recurFibonacci(7),13)
assert.equal(recurFibonacci(30),832040);

// 위의 함수는 콜스택을 계속 쌓아가기 떄문에 성능이 안좋다
// 3) memoization하여 작성하시오.
let memoRunCount=0;
const memoFibonacci = memoized((n)=>{
    memoRunCount++;
    if(n<=1) return n;
    
    return memoFibonacci(n-2)+memoFibonacci(n-1)
})

function memoized(fn){
    const cache = {};
    // return function inner(k){
    //     return cache[k] 
    //         || (cache[k] = fn(k));
    // }
    return (k)=> cache[k]||(cache[k]=fn(k))
}

// TODO : 스터디 큐 프로그램 만들기


assert.equal(memoFibonacci(5),5);
assert.equal(memoFibonacci(7),13);
assert.equal(memoFibonacci(30),832040);

console.log(`loopRunCount: ${loopRunCount}, loopFibonacciAnswerRunCount: ${loopFibonacciAnswerRunCount}, recurRunCount: ${recurRunCount}, memoRunCount: ${memoRunCount}`)