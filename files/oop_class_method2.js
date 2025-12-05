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