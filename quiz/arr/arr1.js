// 1) 특정 배열의 원소 중 소수가 존재하는 체크하는 함수를 작성하시오.


const assert = require('assert');


function isPrime(n){
    if(n===1)return false;
    if(n===2)return true;
    if(n%2===0) return false;
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
        return false; // Found a divisor, so it's not prime
        }
    }
    return true;
}

const hasPrime = (arr) => {
    return arr.some(isPrime)
}

assert.strictEqual(hasPrime([1, 2, 3]), true);


// 2) 특정 배열의 원소 중 소수만 추출하는 함수를 작성하시오.

const primeNumbers = (arr) => {
    return arr.filter(isPrime)

}

assert.deepStrictEqual(primeNumbers([1, 2, 3,4,5,6,7,8,9,10,11,12,13, 14,15

    
]), [
    2, 3, 5, 7, 11, 13
]);