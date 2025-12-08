const expressFn = function(name) {
  // if, 'use strict' ?
  this.name = name;
  console.log(this, new.target, this.name, name);
}


const arrowFn = (name) => {
  this.name = name;
  console.log(this, new.target, this.name, name);
}

// expressFn('expfn');
// arrowFn('afn');

const newExpressFn = expressFn.bind({
    id: 1,
    name : "kim_taeyeong"
})('new expfn');
// 1. expressFn.bind(...)가 실행되면,
//    - `this`가 { id: 1, name: "kim_taeyeong" } 객체에 영구적으로 바인딩된 "새로운 함수"가 생성된다.
// 2. 그 즉시 ('new expfn') 인자와 함께 "새로운 함수"가 호출된다.
// 3. 함수 내부에서,
//    - `this`는 bind로 묶인 { id: 1, ... } 객체를 가리킨다.
//    - `this.name = name;` 코드가 실행되면, 바인딩된 객체의 name 프로퍼티가 'new expfn'으로 덮어써진다.
//    - `new.target`은 `new` 키워드로 호출되지 않았으므로 `undefined`이다.
//    - 최종적으로 { id: 1, name: "new expfn" } 객체가 콘솔에 출력된다.

const newArrowFn = arrowFn.bind({
    id: 2,
    name : "kim_dooyeong"
})('new afn');
// 1. 화살표 함수는 자신만의 `this`를 갖지 않고, 상위 스코프의 `this`를 그대로 물려받는다.
//    (여기서는 전역 스코프의 `this`인 `window` 또는 `global` 객체)
// 2. `bind` 메서드를 호출해도 화살표 함수의 `this`는 바뀌지 않는다. `this` 바인딩이 무시된다.
// 3. 함수 내부에서,
//    - `this`는 여전히 전역 객체를 가리킨다.
//    - `this.name = name;` 코드는 전역 객체의 `name` 프로퍼티를 'new afn'으로 설정한다.
//    - `new.target`은 화살표 함수가 생성자가 될 수 없으므로 항상 `undefined`이다.
//    - 최종적으로 전역 객체가 콘솔에 출력된다.

