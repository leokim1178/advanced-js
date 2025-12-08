// 1 ~ n까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수로 작성하시오.
// (단, array 메소드를 사용하지 말고, destructuring을 사용하시오)
function makeArray(n){
    if(n<=1) return [...arguments];

    n--
    return [...makeArray(n),n+1]
}
const result = makeArray(10)
console.log(result)

function makeArrayAnswer(n){
    if(n===1) return [1]

    return[...makeArrayAnswer(n-1),n]
}
const result1Answer= makeArrayAnswer(10)
console.log(result1Answer)


// 위 makeArray를 TCO로 작성하시오.
// TCO란? 꼬리 재귀
function makeArray2(n,acc=[]){
    if(n<1) return acc;
    n--
    return makeArray2(n,[n+1,...acc])
}

const result2 = makeArray2(10)
console.log(result2)

function makeArrayTCOAnswer(n,acc=[]){
    if(n===1)return [n,...acc]
    return makeArrayTCOAnswer(n-1,[n,...acc])
}
console.log(makeArrayTCOAnswer(10))