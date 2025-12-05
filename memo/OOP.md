# 객체지향 프로그래밍

## 기본 개념

원시타입을 제외한 모든것이 객체다.

instance는 클래스로 만들어진 객체다.

## 클래스와 생성자 함수

`new Animal()`에서 Animal은 클래스인데, 자바스크립트 내에서는 생성자 함수라고도 부른다. 속에는 constructor 함수가 있는데 new 키워드로 호출될 때 실행된다.

```javascript
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const dog = new Animal('멍멍이', 3);
console.log(dog.name); // 멍멍이
console.log(dog.age); // 3
```

JavaScript는 프로토타입 기반 객체 지향언어다.

## 클래스와 인터페이스

Object <- Function 

class는 네모로 그리고 interface는 동그라미로 그린다.

interface는 규격을 정의만 하는것이다. 명세만 있다고 보면 된다.

class는 new를 통해 instance화 될 수 있는 것을 말한다.

## null의 특성

`typeof null`을 해보면 object가 나온다. 이는 JavaScript의 오래된 버그이자 잔재이다. null은 primitive 타입으로 취급되는 특별한 값이다.

## 클래스 상속과 프로토타입

```javascript
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const a1 = new Animal('멍멍이', 3);
console.log(a1.name); // 멍멍이
console.log(a1.age); // 3
```

위에서 name과 age는 속성(attribute)이다. Animal을 상속받은 모든 class들은 프로토타입 체인을 통해 부모 클래스의 속성과 메서드에 접근할 수 있다.

### instance는 prototype을 어떻게 관리할까

**코드블럭 1:**
```javascript
class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, age); // 부모 클래스의 생성자 호출
        this.breed = breed; // Dog 클래스의 고유 속성
    }
    bark() {
        console.log('멍멍! 나는 ' + this.breed + '야!');
    }
}
const merry = new Dog('메리', 2, '골든 리트리버');
merry.bark(); // 멍멍! 나는 골든 리트리버야!
console.log(merry.name); // 메리
console.log(merry.age); // 2
console.log(merry.breed); // 골든 리트리버
```

1. `super`는 부모 클래스의 생성자를 호출하는 역할을 한다.
2. `merry`는 prototype을 실제로 갖고 있지 않다 (메모리 낭비를 피하기 위해).
3. `__proto__`를 통해 prototype을 참조한다.
4. `__`로 되어있는것은 존재는 하지만 사용하지 말라는 뜻이다.
5. 대신 `Object.getPrototypeOf()`를 사용하자.

**코드블럭 2:**
```javascript
console.log(Object.getPrototypeOf(merry) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(merry)) === Animal.prototype); // true
```

6. 이처럼 prototype chain을 따라가면서 속성과 메서드를 찾게 된다.

## 메모리 저장 방식

객체의 property는 instance별 Environment Record에 저장된다. instance마다의 속성은 Environment Record에 저장된다. method를 비롯한 나머지들은 function Object에 저장된다.

특정 인스턴스에 묶이지 않는 함수를 클래스 메소드, 정적메소드라고 한다. 이걸 멤버함수라고 하는 사람도 있다.

## 객체 참조와 동일성

**코드블럭 3:**
```js
let obj = new Object({id : 1});
let obj2 = new Object({id : 1});
console.log(obj === obj2); // false
let obj3 = new Object(obj);
console.log(obj3 === obj); // true
```

7. `obj`와 `obj2`는 각각 다른 객체를 참조하므로 `false`가 출력된다.
8. 반면에 `obj3`는 `obj`를 인자로 받아 동일한 객체를 참조하므로 `true`가 출력된다.
9. 여기서 `obj3`는 `obj`를 Object로 감싸서 캐스팅을 했다고 보면 된다.
```js
> obj={id:1,name:'Hong'}
{ id: 1, name: 'Hong' }
> obj.__proto__
[Object: null prototype] {}
> obj={id:1,name:'Hong',__proto__:{x:11}};
{ id: 1, name: 'Hong' }
> obj.__proto__
{ x: 11 }
```

10. 객체 리터럴로 객체를 생성할 때 `__proto__` 속성을 명시적으로 지정하면, 해당 객체의 프로토타입이 지정한 객체로 설정된다.
11. 위 예제에서 `obj` 객체는 `__proto__` 속성을 통해 `{x:11}` 객체를 프로토타입으로 갖게 된다.
12. 따라서 `obj.x`를 통해 프로토타입 체인을 따라가서 `x` 속성에 접근할 수 있다.
13. 물론 이를 직접 사용하는 것은 권장되지 않는다. 대신 `Object.create()`나 `Object.setPrototypeOf()` 같은 메서드를 사용하는 것이 좋다.

### 프로토타입 체인 확인

**코드블럭 5:**
```js
> class Animal {
    constructor(name) {
        this.name = name || super.constructor.name;
    }
}
> Animal.prototype
{}
> let dog = new Animal('Dog');
> dog.__proto__
{}
> Object.keys(dog)
[ 'name' ]
> class Dog extends Animal {
    bark() {
        console.log('멍멍!',this.name);
    }
}
> let maxx = new Dog('Maxx');
> maxx.__proto__
Animal {}
> Object.getPrototypeOf(maxx)
Animal {}
> Object.getPrototypeOf(Object.getPrototypeOf(maxx))
{}
```

14. `Dog` 클래스는 `Animal` 클래스를 상속받고 있다.
15. `maxx` 인스턴스의 프로토타입은 `Dog.prototype`이고, `Dog.prototype`의 프로토타입은 `Animal.prototype`이다.
16. 따라서 `maxx`는 `Animal` 클래스에서 정의된 속성과 메서드에 접근할 수 있다.
17. `Object.getPrototypeOf()` 메서드를 사용하여 프로토타입 체인을 따라가면서 상위 프로토타입 객체를 확인할 수 있다.

### typeof와 instanceof

**코드블럭 6:**
```js
> typeof Animal
'function' // 클래스도 함수의 일종이기 떄문에 function이 나온다
> Object instanceof Function
true // Object도 함수의 일종이기 떄문에 true가 나온다
> Function instanceof Object
true // JavaScript에서 함수는 객체이기 때문에 Function은 Object의 인스턴스이다
> Dog instanceof Animal
> Animal instanceof Dog
false // 클래스는 함수이지만 클래스끼리는 instanceof가 성립하지 않는다
> obj instanceof Object
true // 객체는 Object의 인스턴스이기 때문에 true가 나온다
> obj instanceof Function
false // 객체는 함수가 아니기 때문에 false가 나온다
> dog.constructor === Animal
true // 인스턴스의 constructor는 해당 인스턴스를 생성한 클래스(함수)를 가리킨다
> maxx.constructor === Animal
false // maxx는 Dog 클래스의 인스턴스이기 때문에 false가 나온다
> maxx.constructor === Dog
true // maxx는 Dog 클래스의 인스턴스이기 때문에 true가 나온다
```

18. 클래스도 함수의 일종이기 때문에 `typeof Animal`은 `'function'`이 나온다.
19. Object도 함수의 일종이기 때문에 `Object instanceof Function`은 `true`가 나온다.
20. JavaScript에서 함수는 객체이기 때문에 `Function instanceof Object`는 `true`가 나온다.
21. 클래스는 함수이지만 클래스끼리는 `instanceof`가 성립하지 않는다.
22. 객체는 Object의 인스턴스이기 때문에 `obj instanceof Object`는 `true`가 나온다.
23. 객체는 함수가 아니기 때문에 `obj instanceof Function`은 `false`가 나온다.
24. 인스턴스의 `constructor`는 해당 인스턴스를 생성한 클래스(함수)를 가리킨다.
25. `maxx`는 Dog 클래스의 인스턴스이기 때문에 `maxx.constructor === Dog`는 `true`가 나온다.

### prototype chain의 특징

- 단방향 Linked List 구조
- prototype chain을 따라 속성과 메서드를 검색
- 최상위 prototype: `Object.prototype`
- prototype chain의 끝: `null`

## Static 메서드와 인스턴스 메서드

### 문제 상황

**코드블럭 7:**
```js
> class Triple {
...    static triple(n) {
...     n = n || 1; 
...     return n * 3;
...   }
... }
undefined
> class BiggerTriple extends Triple {
...    triple(n) {
...     return super.triple(n) * super.triple(n);
...   }
... }
undefined
> bt1 = new BiggerTriple()
BiggerTriple {}
> bt1.triple(9)
Uncaught TypeError: (intermediate value).triple is not a function
    at BiggerTriple.triple (REPL11:3:18)
```

26. `BiggerTriple` 클래스는 `Triple` 클래스를 상속받고 있다.
27. 그러나 `BiggerTriple` 클래스의 `triple` 메서드는 **인스턴스 메서드**로 정의되어 있다.
28. 따라서 인스턴스 메서드에서 `super.triple(n)` 호출은 `Triple` 클래스의 **인스턴스 메서드**를 찾으려고 시도한다.
29. `Triple` 클래스에는 인스턴스 메서드가 없고 static 메서드만 있기 때문에 `TypeError`가 발생한다.

**해결방법 1 - 인스턴스 메서드로 통일:**

**코드블럭 8:**
```js
class Triple {
   triple(n) {
    n = n || 1; 
    return n * 3;
  }
}
class BiggerTriple extends Triple {
  triple(n) {
    return super.triple(n) * super.triple(n);
  }
}
const bt1 = new BiggerTriple();
console.log(bt1.triple(3)); // 81
```

**해결방법 2 - static 메서드로 통일:**

**코드블럭 9:**
```js
class Triple {
   static triple(n) {
    n = n || 1; 
    return n * 3;
  }
}
class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}
const bt1= new BiggerTriple();
console.log(BiggerTriple.triple(3)); // 81
```

30. static 메서드끼리는 상속관계가 성립한다.
31. 인스턴스 메서드에서는 부모 클래스의 static 메서드를 `super`로 호출할 수 없다.

**코드블럭 10:**
```js
class Triple {
  static triple(n) {
    n = n || 1; 
    return n * 3;
  }
}

class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

console.log(Triple.triple()); // 3
console.log(Triple.triple(6)); // 18
console.log(BiggerTriple.triple(3)); // 81
var tp = new Triple();
console.log(BiggerTriple.triple(3)); // 81 
// console.log(tp.triple()); // Error!!
console.log(tp.constructor.triple(3)); // 9
console.log('--------------');

class BiggerTriple2 extends Triple {
    triple(n) {
        return super.triple(n) * super.triple(n);
    }

}
const bt2 = new BiggerTriple2();
// console.log(bt2.triple(4)); // TypeError: (intermediate value).triple is not a function
// 하위 클래스 일지라도 static 메서드로 정의되지 않는다면  인스턴스 메서드에서는 상위 클래스의 static 메서드를 호출할 수 없다.
console.log(bt2.constructor.triple(3)); // 9
// 하지만 인스턴스의 constructor 프로퍼티를 통해 상위 클래스의 static 메서드를 호출할 수는 있다.
console.log('--------------');
// 따라서 static 메서드로 정의하지 않는 상태에서 위와 같은 효과를 원한다면 아래와 같이 extends 할수 있을 것이다

class BiggerTriple3 extends Triple {
    triple(n) {
        return this.constructor.triple(n) * this.constructor.triple(n);
    }
}

const bt3 = new BiggerTriple3();
console.log(bt3.triple(3)); // 81
console.log('--------------');
```

32. 인스턴스에서 static 메서드를 직접 호출하면 에러가 발생한다 (`tp.triple()` → Error).
33. 하위 클래스 일지라도 인스턴스 메서드에서는 상위 클래스의 static 메서드를 `super`로 호출할 수 없다.
34. 하지만 인스턴스의 `constructor` 프로퍼티를 통해 상위 클래스의 static 메서드를 호출할 수는 있다.
35. static 메서드로 정의하지 않고 인스턴스 메서드에서 부모의 static 메서드를 사용하려면 `this.constructor.triple(n)` 형태로 접근할 수 있다.

**코드블럭 11:**
```js
class Animal {
  static ID = 1;
  static isDog(ani) {
    return ani.name === 'Dog';
  }
} 
class Dog extends Animal {
  constructor(name) {
    super();
    this.name = name;
  }
}
const dog = new Animal('Dog');

console.log(dog.constructor) // [class Animal]
// 인스턴스의 constructor는 생성자 함수, 즉 Animal 클래스를 가리킨다.
console.log(Dog.constructor) // [class Function]
// Dog 클래스의 constructor는 Function 생성자 함수를 가리킨다.
```

36. 인스턴스의 `constructor`는 생성자 함수, 즉 해당 인스턴스를 만든 클래스를 가리킨다.
37. 클래스 자체의 `constructor`는 Function 생성자 함수를 가리킨다.

**코드블럭 12:**
```js
class Triple {
  static triple(n) {
    n = n || 1; 
    return n * 3;
  }
}

class BiggerTriple extends Triple {
  static triple(n) {
    console.log('bt1 super.constructor : ',super.constructor);
    // r결과는 [Function: Function] 이다.  즉, super 내의 constructor, 
    // 즉 Triple 클래스의 constructor 
    // static 메서드는 생성자 함수에 바인딩 되어있다고 볼 수 있다

    // 클래스는 생성자함수
    // 클래스 메서드는 생성자 함수의 메서드
    // 생성자 함수는 뭐지 constructor 
    // 그럼 static 함수는 뭐지? 생성자 함수에 바인딩된 메서드

    // 위에서 super는 Triple 클래스를 가리킨다.
    // 그럼 super.constructor는 Triple 클래스의 constructor, 즉 Function 생성자 함수를 가리킨다.
    // 그럼 super.triple(n)은 Triple 클래스의 static 메서드 triple을 가리킨다.
    // 그럼 super.constructor.triple(n)은 Function 생성자 함수의 triple 메서드를 가리키는 건가?
    console.log('bt1 super.constructor.triple : ',super.constructor.triple);
    // 결과는 undefined 이다. Function 생성자 함수에는 triple 메서드가 없기 때문이다.

    return super.triple(n) * super.triple(n);
  }
}

BiggerTriple.triple();

// static 은 class method
```

38. static 메서드 내에서 `super`는 부모 클래스를 가리킨다.
39. static 메서드 내에서 `super.constructor`는 Function 생성자 함수를 가리킨다.
40. `super.constructor.triple`은 `undefined`이다. Function 생성자 함수에는 triple 메서드가 없기 때문이다.
41. `super.triple(n)`은 Triple 클래스의 static 메서드 triple을 가리킨다.

**코드블럭 13:**
```js
class BiggerTriple2 extends Triple {
    triple(n) {
      // 이렇게 static 메서드가 아닌 인스턴스 메서드에서 super를 사용했을때
      console.log('bt2 super.constructor : ',super.constructor);
      console.log('bt2 super.constructor.triple : ',super.constructor.triple);
      // 결과는 각각 [class Triple] 과 [Function: triple] 이다.
      // 이 triple은 멤버 메소드이다 인스턴스 메소드
      // 인스턴스 메소드에서는 constructor가 클래스다
      // 따라서 super.constructor는 Triple 클래스를 가리키며
      // super.constructor.triple은 Triple 클래스의 static 메서드 triple을 가리킨다.
        return super.triple(n) * super.triple(n);
    }

}
BiggerTriple2.triple();
// 호출되지 않는 이유가 뭐지?
// BiggerTriple2의 triple 메서드는 인스턴스 메서드이기 때문에 호출되어도 실행되지 않는다

const bt2 = new BiggerTriple2();
console.log(bt2.triple(2)); // TypeError: (intermediate value).triple is not a function
// 하위 클래스 일지라도 static 메서드로 정의되지 않는다면  인스턴스 메서드에서는 상위 클래스의 static 메서드를 호출할 수 없다.
// console.log(bt2.constructor.triple(3)); // 9
// 하지만 인스턴스의 constructor 프로퍼티를 통해 상위 클래스의 static 메서드를 호출할 수는 있다.

// 정리
// instance의 super.constructor => class
// class의 super.constructor => Function 생성자 함수

// 따라서 static 메서드로 정의하지 않는 상태에서 위와 같은 효과를 원한다면 아래와 같이 extends 할수 있을 것이다
```

42. 인스턴스 메서드 내에서 `super.constructor`는 부모 클래스를 가리킨다 (결과: `[class Triple]`).
43. 인스턴스 메서드 내에서 `super.constructor.triple`은 부모 클래스의 static 메서드 triple을 가리킨다.
44. `BiggerTriple2.triple()`을 호출해도 실행되지 않는다. `BiggerTriple2`의 `triple` 메서드는 인스턴스 메서드이기 때문이다.
45. 인스턴스 메서드에서 `super.triple(n)`을 호출하면 부모의 인스턴스 메서드를 찾으려 하므로, 부모에 static 메서드만 있으면 TypeError가 발생한다.

### 정리

- 인스턴스 메서드에서의 `super.constructor` → 부모 클래스
- static 메서드에서의 `super.constructor` → Function 생성자 함수
