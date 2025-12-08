const obj = {
  name: 'ObjName',
  bark1() {
    console.log('1️⃣  bark1 함수 -> this.name : ', this.name);
    const self = this;  // OLD version
    setTimeout( function() {
        // 이 함수는 setTimeout 속에서 실행되지만 클로저이다( self 변수를 참조)
      console.log('1️⃣  bark1 함수 (setTimeout 내에서) -> self.name : ', self.name); 
      // 결과 : 'ObjName'
      console.log('1️⃣  bark1 함수 (setTimeout 내에서) -> this : ', this); 
      // 결과 : Timeout{...}
    }, 1000);     // .bind(this)
  },
  bark2() { 
    console.log('2️⃣  bark2 함수 -> this.name : ', this.name);

    setTimeout(() => { // 여기서는 화살표 함수!
      console.log(' 2️⃣  bark2 함수 (setTimeout 내에서) -> this.name : ', this.name);
    }, 1000);
  },
  bark3() { 
    function innerFn() {
      console.log('3️⃣  bark3 함수 (innerFn 내에서) -> this : ', this);
    } // 이건 함수 선언문일 뿐, 호출이 아니다
    // 또한 일반함수이기 떄문에 화살표 함수처럼 상위 스코프의 this를 물려받지 않는다.
    // innerFn은 bark3의 내부 함수이지만, 일반 함수로서 호출되었기 때문에
    // 따라서 this는 전역 객체를 가리킨다 (strict mode에서는 undefined)
    // 이 함수는 생성자를 사용한 일반 함수이기 때문에 binding이 되므로  <ref *1> Object [global] {...} 이 찍히는 것
    innerFn();
  },
  bark4: () => {
    console.log('4️⃣  bark4 함수 -> this.name : ', this.name); 
    // this의 바인딩은 일어나지 않는다
    // 왜냐, 화살표 함수는 this를 가질 수 없기 때문이다
    console.log('4️⃣  bark4 함수 -> this : ', this); 
    // 결과 : {} (Node.js 환경에서의 전역 객체)
    // 그럼 왜 innerFn처럼 전역 객체가 아닌 {}일까?
    // 화살표 함수는 자신만의 this 바인딩을 가지지 않기 때문이다
    // 따라서 상위 스코프의 this를 그대로 사용한다
    // 이 경우 상위 스코프는 파일 전체 스코프이다 (모듈 스코프)
    // 모듈 스코프에서의 this는 빈 객체 {} 이다
  }, // bark4의 소유자(obj)의 (Lexical Environment = 전역) 의 this => globalThis
};

obj.bark1(); // bark1()의 바인딩은 obj 
// 1.bark1의 this.name은 'ObjName'
// setTimeout 내부 함수의 this는 Timeout 객체
// 하지만 self 변수는 obj를 가리키므로 self.name은 'ObjName'
obj.bark2();
// 2.bark2의 this.name은 'ObjName'
// setTimeout 내부의 **화살표 함수**는 상위 스코프(bark2)의 this를 그대로 사용한다
// 따라서 this.name은 'ObjName'
obj.bark3();  
obj.bark4();


setTimeout(() => console.log("##############################"), 1000);