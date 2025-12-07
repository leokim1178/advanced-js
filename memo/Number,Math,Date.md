
1. new Number() vs Number()
```js
const num1 = new Number(123);
console.log(typeof num1); // "object"
console.log(num1 instanceof Number); // true
console.log(num1 === 123); // false
const num2 = Number(123);
console.log(typeof num2); // "number"
console.log(num2 instanceof Number); // false
console.log(num2 === 123); // true
```
- `new Number()`는 Number 객체를 생성하며, 이는 객체 타입이다.
  - new Number()는 [[NumberData]] 내부 슬롯에 원시 숫자 값을 저장하는 래퍼 객체를 생성한다.(ES6)
  - ES6 이전에는 [[PrimitiveValue]] 내부 슬롯에 원시 숫자 값을 저장하는 래퍼 객체를 생성했었다.
- `Number()`는 원시 숫자 타입을 반환한다.

2. 몰랐던 사실들
- `+[]` : 빈 배열을 숫자로 변환하면 0이 된다.
- `+{}` : 빈 객체를 숫자로 변환하면 NaN이 된다.
- `+[10]` : [10] 배열을 숫자로 변환하면 1이 된다.(이유는 배열의 첫번째 요소가 바로 주솟값이기 때문에 이를 숫자로 변환하면 1이 된다.)
- `+[1,2]` : [1,2] 배열을 숫자로 변환하면 NaN이 된다. 이 때는 두번쨰 요소부터 어떤것을 변환해야할지 알 수 없기 때문에 NaN이 된다.
- `+null` : null을 숫자로 변환하면 0이 된다.
- `+true` : true를 숫자로 변환하면 1이 된다.
- `+false` : false를 숫자로 변환하면 0이 된다.
- `+''` : 빈 문자열을 숫자로 변환하면 0이 된다.

```js
> 0.0000005
5e-7
> parseInt(0.0000005)
5
> parseFloat(0.0000005)
5e-7
```
- `0.0000005`를 표현하면 `5e-7`로 축약된다.
- `parseInt(0.0000005)`는 `5`를 반환한다. (버그, 주의할것)
- `parseFloat(0.0000005)`는 `5e-7`를 반환한다.

**https://jsisweird.com 에서 문제를 풀어보자**
- 자바스크립트에서 발생하는 이상한 계산들을 연습할 수 있다.

3. toExponential
```js
const num = 123456789;
console.log(num.toExponential()); // "1.23456789e+8"
console.log(num.toExponential(2)); // "1.23e+8"
console.log(num.toExponential(5)); // "1.23457e+8"
```
- `toExponential()` 메서드는 숫자를 지수 표기법으로 변환한다.
- 매개변수로 소수점 이하 자릿수를 지정할 수 있다.
- 반환값은 문자열이다.
- 어떨 때 사용할까?
  - 매우 크거나 매우 작은 숫자를 간결하게 표현하고자 할 때 사용한다.
  - 과학적 계산이나 공학적 응용에서 자주 사용된다.

4. BigInt
- `2^53 - 1` 보다 큰 정수를 안전하게 다루기 위해 도입된 새로운 원시 타입
- 형변환에 주의해야한다
- `+'20n'`: n이 붙은 순간 BigInt가 아니고 문자열이다 따라서 숫자변환시 NaN이 된다
- `BigInt('20') + 10n`: 30n, 
- `BigInt(0.5)`: TypeError, 변환이 불가능하다
- `20n + 10`: TypeError

5. 날짜와 시간
- Date 객체는 1970년 1월 1일 00:00:00 UTC를 기준으로 밀리초 단위의 시간을 나타낸다 -> Unix 타임스탬프
- UTC: 협정 세계시, GMT와 동일한 시간대

- moment.js, date-fns를 가장 많이 사용한다


6. debounce 함수
- delay 기간 중 재 호출 시 기존 호출 무시하며 다시 delay 시간 카운트 시작
- 즉, 마지막(최종) 호출이 delay초(ms) 후에 실행!
```js
const debounce = (cb, delay) => {
  let timer;
  return (...args) => {  
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  }
}
const act = debounce(a => a + 1, 1000);
act(100);
// 1초 동안 n번 호출 => 실행은 1회만!
// 1초 후 => cb(100) 실행
// 1.5초 후
act(100);   // 마지막 호출부터 delay 후 cb 실행!!
```
7. throttle 함수
- delay 기간 별 1회 호출 보장!
- 100번 호출해도 delay마다 1번씩만 호출된다
```js
const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  }
}
const act = throttle(a => a + 1, 1000);
act(1);
// 1초 동안 n번 호출 => 실행은 1회만!
// 10초 동안 n번 호출 => 실행은 10회만!
// 매 1초 마다 => cb(100) 실행
act(100);
```