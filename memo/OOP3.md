## Overriding
- 부모 클래스의 메서드를 자식 클래스에서 재정의하는 것  
```js
class Animal {

  id = 1;       // member property
  #age = 10;    // private member variable
  constructor(name) { // constructor
    this.name = name; // member property
  }
  getAge() {  // Override the Object's toString()
    return this.#age;
  }

  toString() {  // Override the Object's toString(), [메소드] 다형성!
    return `This animal's name is ${this.name}.`;
  }
} 

let dog = new Animal('Dog');
console.log(dog.toString()); // This animal's name is Dog.
```
- 위와 같이 Object의 toString() 메서드를 오버라이딩하여 재정의할 수 있다


# OverLoading

## 오버로딩이란?
- `f(a,b){...}`와 `f(a,b,c){...}`처럼 **같은 이름의 함수를 매개변수의 개수나 타입에 따라 다르게 정의**하는 것
- Java, C++ 같은 언어에서는 이 두 개의 함수가 **다른 호출 시그니처(signature)**를 갖는다

```java
// Java의 오버로딩 예시
class Calculator {
    int add(int a, int b) {           // 시그니처: add(int, int)
        return a + b;
    }
    
    int add(int a, int b, int c) {    // 시그니처: add(int, int, int)
        return a + b + c;
    }
    
    double add(double a, double b) {  // 시그니처: add(double, double)
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(1, 2);        // add(int, int) 호출
calc.add(1, 2, 3);     // add(int, int, int) 호출
calc.add(1.5, 2.5);    // add(double, double) 호출
```

## JavaScript는 왜 오버로딩이 안 되는가?

### 1. 함수는 객체이고, 이름은 참조일 뿐이다

JavaScript에서 **함수 이름은 단지 함수 객체를 가리키는 참조(변수)**일 뿐이다. 같은 이름으로 함수를 재선언하면 이전 함수를 **덮어쓴다**.

```js
function add(a, b) {
    console.log('2개 매개변수 버전');
    return a + b;
}

function add(a, b, c) {  // 위의 add를 덮어씀!
    console.log('3개 매개변수 버전');
    return a + b + c;
}

// 결과: 마지막에 정의된 함수만 존재
add(1, 2);        // '3개 매개변수 버전', 3 (c는 undefined)
add(1, 2, 3);     // '3개 매개변수 버전', 6
```

**왜 이렇게 동작할까?**

```js
// 위 코드는 실제로 다음과 같이 동작한다
var add;

add = function(a, b) {
    console.log('2개 매개변수 버전');
    return a + b;
};

add = function(a, b, c) {  // add 변수에 새 함수를 재할당
    console.log('3개 매개변수 버전');
    return a + b + c;
};
```

### 2. JavaScript는 매개변수 개수를 체크하지 않는다

Java 같은 언어는 **컴파일 타임**에 함수 시그니처(이름 + 매개변수 타입/개수)로 어떤 함수를 호출할지 결정한다. 하지만 JavaScript는:

- **매개변수 개수가 맞지 않아도 에러가 나지 않는다**
- 부족한 매개변수는 `undefined`가 된다
- 초과된 매개변수는 무시된다 (단, `arguments`로 접근 가능)

```js
function greet(name, age) {
    console.log(`이름: ${name}, 나이: ${age}`);
}

greet('김철수');              // 이름: 김철수, 나이: undefined
greet('이영희', 25);          // 이름: 이영희, 나이: 25
greet('박민수', 30, '서울');  // 이름: 박민수, 나이: 30 (세 번째 인자는 무시)
```

### 3. arguments 객체의 역할

`arguments`는 **유사 배열 객체(array-like object)**로, 함수에 전달된 모든 인자를 담고 있다. 이것이 오버로딩이 안 되는 직접적인 이유는 아니지만, JavaScript가 **가변 인자를 유연하게 처리**할 수 있게 해준다.

```js
function sum() {
    console.log(arguments);  // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(arguments.length);  // 3
    
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5);  // 15
```

**참고:** `arguments`는 iterable이다 (Symbol.iterator를 가짐). 하지만 이것이 오버로딩과 직접적인 관계는 없다.

### 4. 정리: 오버로딩이 안 되는 진짜 이유

1. **함수 이름은 단순한 참조(변수)**: 같은 이름으로 재선언하면 덮어쓴다
2. **타입 시스템 부재**: JavaScript는 동적 타입 언어라서 매개변수 타입으로 구분할 수 없다
3. **매개변수 개수 검증 안 함**: 인자 개수가 달라도 같은 함수가 호출된다
4. **런타임 결정**: 컴파일 타임에 시그니처로 구분할 수 없다

## JavaScript에서 오버로딩 흉내내기

오버로딩은 지원하지 않지만, `arguments`나 나머지 매개변수(`...`)를 사용해 비슷하게 구현할 수 있다.

### 방법 1: arguments 사용

```js
function add() {
    if (arguments.length === 2) {
        console.log('2개 매개변수 버전');
        return arguments[0] + arguments[1];
    } else if (arguments.length === 3) {
        console.log('3개 매개변수 버전');
        return arguments[0] + arguments[1] + arguments[2];
    }
}

add(1, 2);     // 2개 매개변수 버전, 3
add(1, 2, 3);  // 3개 매개변수 버전, 6
```

### 방법 2: 나머지 매개변수 사용 (권장)

```js
function add(...numbers) {
    console.log(`${numbers.length}개 매개변수 버전`);
    return numbers.reduce((sum, num) => sum + num, 0);
}

add(1, 2);           // 2개 매개변수 버전, 3
add(1, 2, 3);        // 3개 매개변수 버전, 6
add(1, 2, 3, 4, 5);  // 5개 매개변수 버전, 15
```

### 방법 3: 타입 체크 (매개변수 타입에 따른 분기)

```js
function process(value) {
    if (typeof value === 'string') {
        console.log('문자열 처리:', value.toUpperCase());
    } else if (typeof value === 'number') {
        console.log('숫자 처리:', value * 2);
    } else if (Array.isArray(value)) {
        console.log('배열 처리:', value.length);
    }
}

process('hello');    // 문자열 처리: HELLO
process(42);         // 숫자 처리: 84
process([1, 2, 3]);  // 배열 처리: 3
```

## TypeScript의 오버로딩

TypeScript에서는 **함수 시그니처 선언**으로 오버로딩을 흉내낼 수 있지만, 실제로는 하나의 구현만 존재한다.

```typescript
// 오버로드 시그니처들
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number[], b: number[]): number[];

// 실제 구현 (하나만 존재)
function add(a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        return [...a, ...b];
    }
}

add(1, 2);           // 3 (number)
add('Hello', ' World');  // 'Hello World' (string)
add([1, 2], [3, 4]); // [1, 2, 3, 4] (number[])
```

**TypeScript의 오버로딩은:**
- 컴파일 타임에만 타입 체크를 제공한다
- 런타임에는 결국 하나의 JavaScript 함수로 컴파일된다
- 진짜 오버로딩이 아니라 **타입 안전성을 위한 문법적 설탕(syntactic sugar)**이다