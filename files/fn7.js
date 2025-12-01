const arr = ['1', '2', '3'];

const rets = arr.map(parseInt);
// map 함수는 첫번째 인자가 원소 값, 두번째 인자가 인덱스, 세번째 인자가 배열 전체이다.
// parseInt 함수는 두번째 인자가 진법(radix)이다.
// 따라서 아래와 같이 동작한다:
//   - parseInt('1', 0)  => 1 (0 진법은 10 진법과 동일하게 처리됨)
//   - parseInt('2', 1)  => NaN (1 진법에는 '2'라는 숫자가 없음)
//   - parseInt('3', 2)  => NaN (2 진법에는 '3'이라는 숫자가 없음)
console.log(rets);   // [ 1, NaN, NaN ]


// 그럼 이걸 unary로 감싸서 해결해보자
// unary 뜻 : 단항의, 하나의 인자만 받는
const unary = fn => fn.length === 1
   ? fn
   : (arg) => fn(arg);

const rets2 = arr.map(unary(parseInt));
// fn의 길이가 1이 아니므로,
// (arg) => fn(arg) 형태의 함수가 반환된다.
// 따라서 map 함수는 각 원소에 대해 parseInt 함수에 원소 값만 전달하게 된다:
//   - parseInt('1')  => 1
//   - parseInt('2')  => 2
//   - parseInt('3')  => 3

console.log(rets2);   // [ 1, 2, 3 ]