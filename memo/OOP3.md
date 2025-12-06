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

### Accessor Property (접근자)
```js
class Empty{
    set fullName(name){
        [this.firstName, this.lastName] = name.split(" ");
    }
    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    }    
}
let person = new Empty();
person.fullName = "John Doe"; // set 호출
console.log(person.fullName);  // get 호출, "John Doe"
```
- `get`과 `set` 키워드를 사용하여 멤버 변수를 직접 접근하지 않고도 값을 설정하거나 가져올 수 있다

#### 주의할점
instance에 setter와 동일한 속성인 멤버 변수가 있으면 Stack Overflow가 발생할 수 있다
```js
class Name{
    constructor(name){
        this.name = name; // 여기서 setter가 호출되면서 무한 루프 발생
    }
    set name(nm){
        this.name = nm; 
    }
    get name(){
        return this.name; 
    }
}
let n = new Name("Alice"); // Stack Overflow
// RangeError: Maximum call stack size exceeded
```

따라서 setter와 getter 내부에서는 멤버 변수를 직접 접근하지 않고, 별도의 프라이빗 변수를 사용하는 것이 좋다
```js
class Name{

    constructor(name){
        this._name = name; // 프라이빗 변수에 할당
    }
    set name(nm){
        this._name = nm; // 프라이빗 변수에 할당
    }
    get name(){
        return this._name; // 프라이빗 변수 반환
    }
}
let n = new Name("Alice");
console.log(n.name); // "Alice"
n.name = "Bob";
console.log(n.name); // "Bob"
```
_name처럼 언더스코어(_)로 시작하는 이름으로 protected(또는 private-like) 변수를 만드는 관례가 있다

### AOP (Aspect Oriented Programming)
- 관점 지향 프로그래밍
- 로그인을 할때 로그인에 관점이 집중되어있을것이다
- 그런데 로그인 시도를 할때 누가 로그인했는지 언제 했는지 기록되어야 할 것이다
- 이렇게 로그인이라는 것이 시도 될때, 실제 로그인 로직과 로그인 기록 로직이 함께 실행되어야 할것이다
- 이런 공통 관심사를 분리하여 관리하는 기법을 aspect라고 한다
- before와 after로 나누어서 동작하게끔 만들어야 한다
- 이 떄 나오는 것이 proxy 패턴이다
```js
const proxyObj = new Proxy(targetObj,handler);
```
- 데이터 베이스의 트리거 같은 느낌이다
- 용도
  - 객체의 작업에 대한 로깅
  - 잘못된 접근에 오류 발생시키기
  - 접근 제어
  - 객체의 정보 은닉

```js
const proxyObj = new Proxy(hong, {
  get(target, prop, receiver) {  // receiver: this binding object
    console.log('proxy.get>>', target, prop);
    if (prop === 'fullName') {
       return `${target.firstName} ${target.lastName}`;
    } else {
      return target[prop]?.toUpperCase();
    } // return Reflect.get(target, prop, receiver);
  },


  set(target, prop, value, receiver) {
    console.log('proxy.set>>', target, prop, value);
    if (prop === 'fullName') {
      const [f, l] = value.split(' ');
      target.firstName = f;
      target.lastName = l;
    } else { target[prop] = value; }   // target[prop]이 함수라면??
      // return Reflect.set(target, prop, value, receiver);
    return target;
  },
});

proxyObj.fullName = 'Nanda Kim';
console.log('proxy>>', proxyObj.fullName);
console.log('proxy>>', proxyObj);
console.log('instance>>', proxyObj instanceof Emp);
```

### Object.defineProperties()
- 객체에 접근자 프로퍼티를 정의하는 또 다른 방법
```js
Animal.prototype.toUpperName = function () {
  return this.name.toUpperCase();
};
⇒ console.log(dog.toUpperName());

Object.defineProperties(Animal.prototype, {
  upperName: {
    get: function () {
      return this.name.toUpperCase();
    },
  },
});
⇒ console.log(dog.upperName);
```



### Abstract Class
- abstract class는 interface처럼 명세화로 사용할수 있고, 상속을 통해 instance를 생성할수도 있다
- 그런데 객체지향 프로그램에서 Abstract class는 안티패턴이다
  - 구현이 되어있는지 안되어있는지 헷갈리고 누가 구현을 해야하는지 모호하다
  - interface로 명세화하고, 구체적인 구현은 상속받는 클래스에서 구현하는 것이 좋다


### 다중 상속
```js
class Pet {
  feed(nutrient) {
    console.log(`feed to ${this.name} :`, nutrient);
  }
} 
class Dog extends Animal, Pet { // 불가!!
class Pet extends Animal { // 맞지 않음 (: Pet Plant도 있으니…)
class Animal extends Pet { // 맞지 않음 (:모든 동물이 애완은 아니니…)

jake.feed('dog-food'); // 그럼 어떻게 feed를 호출할 수 있을까?
jake.petty = Object.create(Pet.prototype); // Pet의 prototype으로 생성(부여)
jake.petty.feed('dog-food'); // 실행은 된다 그런데 이방법이 맞을까? this가 유실된 것을 알 수 있다
// 해결책: mixin 패턴

jake.feed('dog-food'); // this가 유실되지 않고 잘 동작한다
const petMixin={
    likesPeople(){
        console.log(`${this.name} likes people!`);
    }
}
Object.assign(jake, petMixin); // jake에 petMixin을 복사
Object.assign(Dog.prototype, petMixin); // 모든 Dog에 petMixin을 복사
jake.likesPeople();
```

trait 패턴
- 다중 상속의 문제를 해결하기 위한 패턴
- mixin 패턴과 유사하지만, 충돌 해결을 위한 규칙이 있다
```js
class Pet {
  feed(nutrient) {
    console.log(`feed to ${this.name} :`, nutrient);
  }
} 
// class Dog extends Animal, Pet {} // 불가!!

class Animal {
    constructor(name) {
        this.name = name;
    }
    bark() {
        console.log(`${this.name} : woof! woof!`);
    }
}


// class Pet extends Animal { }// 맞지 않음 (: Pet Plant도 있으니…)
// class Animal extends Pet { }// 맞지 않음 (:모든 동물이 애완은 아니니…)
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}   

const jake = new Dog('jake');
// jake.feed('dog-food'); // 이걸 가능하게 하려면?

// 1. __proto__ 직접 수정
// 이 방법이면 Animal의 기능을 잃기 때문에 나쁜 케이스이다
// jake.__proto__ = Pet.prototype; 
// jake.bark(); // bark가 불가능해진다

// 2. mixin 함수 작성 & Object.assign 활용
const petMixin= {
    likesPeople(){
        console.log(`${this.name} likes people!`);
    }
}
// 2-1 jake에게 petMixin 기능 추가
// Object.assign(Dog.prototype, petMixin);
// jake.likesPeople();
// jake.feed('dog-food'); // 그런데 이렇게 해도 feed는 안됨

// 2-2 Dog.prototype에 Pet의 기능을 추가
Object.assign(Dog.prototype, petMixin);
jake.likesPeople();
// 이렇게 jake의 prototype인 Dog.prototype에 Pet의 기능을 복사해 넣는 방식으로 mixin을 구현할 수 있다

// jake.feed('dog-food'); // 이렇게 해도 안된다
// jake는 Dog의 인스턴스이므로 Dog.prototype에 Pet.prototype의 메서드를 복사해 넣어야 한다

// mixin 함수 작성 
// Object.assign은 enumerable 속성만 복사하는데, 클래스 메서드는 non-enumerable이다
// 따라서 Object.getOwnPropertyDescriptors를 사용해야 한다
function mixin(target, ...sources){
    for (const source of sources) {
        // 모든 속성(enumerable이 아닌 것도 포함)을 복사
        const descriptors = Object.getOwnPropertyDescriptors(source);
        Object.defineProperties(target, descriptors);
    }
}

console.log('\n=== 왜 Object.assign이 안 되는가? ===');
console.log('Pet.prototype.feed enumerable?', 
    Object.getOwnPropertyDescriptor(Pet.prototype, 'feed').enumerable); // false

// 2-3 mixin 함수 활용 - Pet.prototype의 메서드를 Dog.prototype에 복사
mixin(Dog.prototype, Pet.prototype);

jake.feed('dog-food'); // feed to jake : dog-food - 성공!
jake.bark(); // jake : woof! woof! - Animal의 기능도 유지됨!

console.log('\n=== Mixin 방법들 ===\n');

// ========================================
// 방법 3: 여러 클래스를 순차적으로 mixin
// ========================================
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

const kitty = new Cat('kitty');

// 여러 mixin을 한 번에 적용 - Object.assign은 enumerable 속성만 복사하므로 클래스 메서드는 복사 안됨
// 대신 개선된 mixin 함수 사용
mixin(Cat.prototype, Pet.prototype, petMixin);
kitty.feed('cat-food');     // feed to kitty : cat-food
kitty.likesPeople();        // kitty likes people!
kitty.bark();               // kitty : woof! woof!

console.log('\n=== 방법 4: Subclass Factory Pattern (고급) ===\n');

// ========================================
// 방법 4: Subclass Factory Pattern
// - 함수형으로 mixin을 구현하는 현대적인 방법
// - 여러 mixin을 체이닝할 수 있음
// ========================================

// Mixin을 함수로 정의
const PetMixin = (SuperClass) => class extends SuperClass {
    feed(nutrient) {
        console.log(`feed to ${this.name} :`, nutrient);
    }
    likesPeople() {
        console.log(`${this.name} likes people!`);
    }
};

const PlayableMixin = (SuperClass) => class extends SuperClass {
    play(toy) {
        console.log(`${this.name} plays with ${toy}!`);
    }
};

// Mixin을 체이닝하여 새로운 클래스 생성
class Rabbit extends PlayableMixin(PetMixin(Animal)) {
    constructor(name) {
        super(name);
    }
    hop() {
        console.log(`${this.name} hops around!`);
    }
}

const bunny = new Rabbit('bunny');
bunny.bark();           // bunny : woof! woof! - Animal
bunny.feed('carrot');   // feed to bunny : carrot - PetMixin
bunny.likesPeople();    // bunny likes people! - PetMixin
bunny.play('ball');     // bunny plays with ball! - PlayableMixin
bunny.hop();            // bunny hops around! - Rabbit

console.log('\n=== 방법 5: Symbol을 사용한 Mixin (충돌 방지) ===\n');

// ========================================
// 방법 5: Symbol을 사용하여 메서드명 충돌 방지
// ========================================

const feedSymbol = Symbol('feed');
const SafePetMixin = {
    [feedSymbol](nutrient) {
        console.log(`[Safe] feed to ${this.name} :`, nutrient);
    }
};

class Bird extends Animal {
    constructor(name) {
        super(name);
    }
}

Object.assign(Bird.prototype, SafePetMixin);

const tweety = new Bird('tweety');
tweety[feedSymbol]('seeds');  // [Safe] feed to tweety : seeds
tweety.bark();                 // tweety : woof! woof!

console.log('\n=== 방법 6: Trait Pattern - 상속처럼 사용하는 Mixin ===\n');


// Trait 패턴을 위한 믹싱 함수 - 클래스를 반환
function mix(...mixins) {
    // 기본 클래스 생성
    class Mixed {
        constructor(...args) {
            // 각 mixin의 생성자 호출 (있다면)
            mixins.forEach(mixin => {
                if (mixin.prototype && mixin.prototype.constructor) {
                    // mixin이 클래스인 경우
                    const instance = new mixin(...args);
                    // 인스턴스 속성 복사
                    Object.assign(this, instance);
                }
            });
        }
    }
    
    // 각 mixin의 메서드를 Mixed의 prototype에 복사
    mixins.forEach(mixin => {
        if (mixin.prototype) {
            // 클래스인 경우 prototype의 모든 속성 복사
            const descriptors = Object.getOwnPropertyDescriptors(mixin.prototype);
            Object.defineProperties(Mixed.prototype, descriptors);
        } else {
            // 일반 객체인 경우 그대로 복사
            Object.assign(Mixed.prototype, mixin);
        }
    });
    
    return Mixed;
}

// 또 다른 trait - Reptile
class Reptile {
    constructor(name) {
        this.coldBlooded = true;
    }
    
    regulateTemperature() {
        console.log(`${this.name} is basking in the sun to regulate temperature.`);
    }
    
    shedSkin() {
        console.log(`${this.name} is shedding its skin.`);
    }
}

// Trait Pattern 사용: Animal과 Pet을 모두 상속받은 것처럼 동작
class Lizard extends mix(Animal, Pet, Reptile) {
    constructor(name, species) {
        super(name);
        this.species = species;
    }
    
    climb() {
        console.log(`${this.name} the ${this.species} is climbing the wall!`);
    }
}

const gecko = new Lizard('Gecko', 'Leopard Gecko');
console.log('gecko 인스턴스 생성:', gecko.name, '/', gecko.species);
console.log('gecko.coldBlooded:', gecko.coldBlooded);

// Animal의 메서드
gecko.bark(); // Gecko : woof! woof!

// Pet의 메서드
gecko.feed('insects'); // feed to Gecko : insects

// Reptile의 메서드
gecko.regulateTemperature(); // Gecko is basking in the sun to regulate temperature.
gecko.shedSkin(); // Gecko is shedding its skin.

// Lizard의 고유 메서드
gecko.climb(); // Gecko the Leopard Gecko is climbing the wall!



console.log('\n=== 프로토타입 체인 확인 ===\n');

console.log('jake instanceof Dog:', jake instanceof Dog);           // true
console.log('jake instanceof Animal:', jake instanceof Animal);     // true
console.log('jake instanceof Pet:', jake instanceof Pet);           // false - mixin은 상속이 아님!

console.log('\ngecko instanceof Lizard:', gecko instanceof Lizard);     // true
console.log('gecko instanceof Animal:', gecko instanceof Animal);       // false - trait도 진짜 상속은 아님!
console.log('gecko instanceof Pet:', gecko instanceof Pet);             // false
console.log('gecko instanceof Reptile:', gecko instanceof Reptile);     // false

console.log('\njake의 프로토타입 체인:');
console.log('jake.__proto__ === Dog.prototype:', jake.__proto__ === Dog.prototype);                          // true
console.log('Dog.prototype.__proto__ === Animal.prototype:', Dog.prototype.__proto__ === Animal.prototype);  // true

console.log('\ngecko의 프로토타입 체인:');
console.log('gecko.__proto__ === Lizard.prototype:', gecko.__proto__ === Lizard.prototype);  // true
console.log('Lizard.prototype.__proto__:', Lizard.prototype.__proto__.constructor.name);     // Mixed
```
### Mixin 방법들

1. Object.assign 직접 사용
   - Object.assign(Dog.prototype, Pet.prototype)
   - ❌ 문제: 클래스 메서드는 non-enumerable이라 복사 안됨!
   - ✅ 해결: Object.getOwnPropertyDescriptors + Object.defineProperties 사용

2. Mixin 헬퍼 함수 
   - function mixin(target, ...sources) {
       for (const source of sources) {
         const descriptors = Object.getOwnPropertyDescriptors(source);
         Object.defineProperties(target, descriptors);
       }
     }
   - non-enumerable 속성도 복사 가능
   - 재사용 가능한 유틸리티 함수

3. Subclass Factory Pattern (권장)
   - const PetMixin = (SuperClass) => class extends SuperClass { ... }
   - 체이닝 가능
   - 타입스크립트와 호환성 좋음
   - 프로토타입 체인 유지
   - enumerable 문제 없음

4. Symbol을 사용한 Mixin
   - 메서드명 충돌 방지
   - private-like 동작

5. Trait Pattern (다중 상속처럼 사용)
   - class Lizard extends mix(Animal, Pet, Reptile) {}
   - extends 문법으로 직관적
   - 여러 클래스를 하나로 조합
   - 클래스 선언 시점에 기능 결정
   - composition을 상속처럼 표현
   - trait 패턴의 장점:
     1. extends 문법으로 직관적으로 사용 가능
     2. 여러 클래스의 기능을 하나로 조합
     3. 코드 재사용성 극대화
     4. 클래스 선언 시점에 기능이 결정됨 (명확함)

=== Trait Pattern vs 일반 Mixin 비교 ===

일반 Mixin (prototype에 복사):
- mixin(Dog.prototype, Pet.prototype)
- 인스턴스 생성 후 기능 추가
- 동적이지만 덜 직관적

Trait Pattern (extends로 조합):
- class Lizard extends mix(Animal, Pet, Reptile) {}
- 클래스 정의 시점에 기능 조합
- 정적이지만 더 명확하고 직관적
- "is-a" 관계처럼 보이지만 실제로는 "has-a" (composition)


핵심 문제와 해결:
- 클래스 메서드는 기본적으로 non-enumerable이다
- Object.assign()은 enumerable 속성만 복사한다
- Object.getOwnPropertyDescriptors()를 사용하면 모든 속성을 복사할 수 있다

주의사항:
- Mixin은 상속이 아니라 복사(copy)다
- instanceof로 mixin한 클래스를 확인할 수 없다
- 메서드명 충돌에 주의해야 한다
- Subclass Factory Pattern을 사용하면 이런 문제들을 완화할 수 있다
