

strict mode란
자바스크립트의 엄격한 문법 규칙을 적용하는 모드.
strict mode를 사용하면 다음과 같은 이점이 있다:
- 잠재적인 오류를 조기에 발견할 수 있다.
- 안전하지 않은 동작을 방지할 수 있다.
- 향후 자바스크립트 버전과의 호환성을 높일 수 있다.
- 디버깅이 용이해진다.
- 블록 내의 함수는 블럭 스코프를 갖는다.
- 선언하지 않은 식별자는 접근할수 없다.
- 암묵적 전역은 허용되지 않는다.
- Block 내에서, var은 느슨한 모드와 동일한 스코프다. 그러나 함수는 블록 스코프를 갖는다.

strict mode 활성화 방법
strict mode는 코드의 최상단이나 함수의 최상단에 다음과 같은 지시자를 추가하여 활성화할 수 있다:
```javascript
'use strict';
```

사용 예시
```javascript
'use strict';
function ex1(x,x){ 
    // 일반 모드에서는 에러 없이 동작
    // strict mode에서는 중복 매개변수 사용으로 인해 에러 발생
    return x + x;
}
```

그런데 굳이 매번 이 지시자를 추가하지 않아도 된다
Node.js 환경에서는 파일 단위로 strict mode가 기본 적용된다.
브라우저 환경에서는 ES6 모듈을 사용할 때 strict mode가 기본 적용된다.
번들링할때는 babel이 trnspiling하고 webpack이 모듈을 묶어줄 때 strict mode를 자동으로 적용해준다.
babel은 부적절한 코드는 아예 transpiling하지 않도록 막아준다.

bundeling이란
여러 개의 자바스크립트 파일을 하나의 파일로 묶는 과정.
빌드를 하게 되면 a.min.js 이런식으로 하나의 파일로 묶이게 된다.
a.map.js 라는 소스맵 파일도 생성된다
minifying, uglifying 과정을 거치는데 이 과정이란
변수명을 짧게 바꾸고, 공백이나 주석을 제거하여 파일 크기를 줄이는 작업이다
ts도 마찬가지로 d.ts 라는 소스맵 파일을 생성한다.
이런 과정에서 strict mode가 자동으로 적용된다.

또 그 이전에 ESM 모듈은 strict mode가 기본 적용되기 떄문에 strict mode를 신경쓸 필요가 없다.


```js
var gg = 1;
let bb = 2;

function f1(x, y) {
  var gg = 11;
  let bb = 22;
  console.log('f1>', gg, bb, zz, f2, f2.length);
  f2('* first'); // 
  {
    const xx = 99;
    f2('* nest-first');
    var zz = 88;
    function f2(t) {
      console.log(t, '`nested`', xx, zz);
    }
  }
  function f2(t, u) {
    console.log(t, '`inner`', xx, zz);
  } // 보통 바벨이 지운다
  function f2(t, u, v) {
    console.log(t, '`inner2`', xx, zz);
  }
  var zz = 800;
  console.log('🚀  gg:', gg);
  f2('* second');
}

function f2(g) {
  console.log(g, 'global f2>', gg, bb, xx, kk);
}
let xx = 9;
if (gg > 0) {
  var kk = 33;
  const yy = 9;
}
f1(1, 2); 
console.log('kkkkk>>', kk);
f2('* third');
```

위와 같은 코드가 있다고 하자

strict mode가 아닐때는
블록 내에서 선언된 함수 f2는
블록 밖으로 호이스팅되어 f2를 덮어쓰게 된다
따라서 이후에 선언된
```js
  function f2(t, u) {
    console.log(t, '`inner`', xx, zz);
  } // 보통 바벨이 지운다
  function f2(t, u, v) {
    console.log(t, '`inner2`', xx, zz);
  }
```
f1 내에서 이후에 선언된 이 두개의 f2는 *frist 호출을 제외하고는 존재하지 않게 된다







이제 strict mode를 적용해보자
```js
'use strict';
var gg = 1;
let bb = 2;
function f1(x, y) {
...
}
```
위와 같이 strict mode일때,
f2는 절대로 위로 호이스팅될 수 없다
따라서 블록 내에서 선언된
```
    function f2(t) {
      console.log(t, '`nested`', xx, zz);
    }
```
은 블록 밖을 나오지 못하고 블록 내에서 호출된 f2('* nest-first'); 에서만 호출된다.

이후의 `f2('* second');` 호출은
```
  function f2(t, u, v) {
    console.log(t, '`inner2`', xx, zz);
  }
```
블록 밖에서 선언된 이 f2가 호출된다.