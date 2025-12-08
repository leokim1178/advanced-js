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