
// 재귀함수

function factorial(n) {
  if (n === 1) return 1; // 재귀함수를 부를 때는 항상 종료조건을 명시하는 습관을 들여야한다
  return n * factorial(n - 1);
}
// f(3): 3 * f(2)
            //  2 *  f(1)
                  //  1


console.log(factorial(3));


let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);

// 위 함수를 아래와 같은 재귀함수로 구현할 수 있다
function addTo100(a = 1) {
  if (a == 100) return a;
  return a + addTo100(a + 1);
}
console.log(addTo100());

// 그러나 재귀함수는 반복문에 비해 성능이 떨어지기 때문에 주의해서 사용해야 한다
// 왜 성능이 안좋을까?
// ECS에 콜스텍이 계속 쌓이고 environmentRecord도 계속 쌓이기 때문이다
// 따라서 재귀함수를 사용할 때는 꼬리재귀 최적화(tail call optimization) 기법을 사용하는 것이 좋다
// 꼬리재귀 최적화는 재귀함수의 마지막에 자기 자신을 호출하는 경우에 한해서 콜스텍을 쌓지 않는 기법이다
// 자바스크립트 엔진이 꼬리재귀 최적화를 지원하는 경우에만 사용할 수 있다

// 꼬리재귀 최적화 기법을 사용한 재귀함수
function addTo100Tail(a = 1, acc = 0) {
  if (a > 100) return acc;
  return addTo100Tail(a + 1, acc + a); // 마지막에 자기 자신을 호출
}
console.log(addTo100Tail());