객체지향 프로그래밍

원시타입을 제외한 모든것이 객체다

instance는 클래스로 만들어진 객체다

`new Animal()`
여기서 Animal은 클래스인데 자바스크립트 내에서는 생성자 함수라고도 부른다
속에는 constructor 함수가 있는데 new 키워드로 호출될 때 실행된다
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

JS는 프로토타입 기반 객체 지향언어다

Object <- Function 
class는 네모로 그리고
interface는 동그라미로 그린다
interface는 규격을 정의만 하는것이다
명세만 있다고 보면 된다

interface는 명세만 있는것이고
class는 new를 통해 instance화 될 수 있는 것을 말한다

null은 객체다
그런데 우리가 이 null을 primitive 타입으로 취급하는 이유는 
이 null은 Heap에 생기지 않고 stack에 생기기 때문이다
사실 `typeof null`을 해보면 object가 나온다
이는 js의 오래된 버그이자 잔재이다


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
위에서 name과 age는 속성(attribute)이다
bark는 메서드(method)다
이것들은 모두 프로토타입 체인 상에 존재한다
따라서 Animal을 상속받은 모든 class들은 프로토타입을 받아왔기 떄문에 name, age를 사용할 수 있다

그럼 instance는 portotype을 어떻게 관리할까
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
여기서 super는 부모 클래스의 생성자를 호출하는 역할을 한다
merry는 prototype을 실제로 갖고 있지 않다 낭비니까
__proto__를 통해 prototype을 참조한다
`__`로 되어있는것은 존재는 하지만 사용하지 말라는 뜻이다
대신 Object.getPrototypeOf()를 사용하자
```javascript
console.log(Object.getPrototypeOf(merry) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(merry)) === Animal.prototype); // true
```
이처럼 prototype chain을 따라가면서 속성과 메서드를 찾게 된다



객체의 property는 instance별 Environment Record에 저장된다
instance마다의 속성은 Environment Record에 저장된다
method를 비롯한 나머지들은 function Object에 저장된다

특정 인스턴스에 묶이지 않는 함수를 클래스 메소드, 정적메소드라고 한다
이걸 멤버함수라고 하는 사람도 있다

```js
let obj = new Object({id : 1});
let obj2 = new Object({id : 1});
console.log(obj === obj2); // false
let obj3 = new Object(obj);
console.log(obj3 === obj); // true
```
위 예제에서 obj와 obj2는 각각 다른 객체를 참조하므로 false가
출력된다. 반면에 obj3는 obj를 인자로 받아 동일한 객체를 참조하므로 true가 출력된다.
여기서 obj3는 obj를 Object로 감싸서 캐스팅을 했다고 보면 된다.


## prototype

