const Dog = function(name) {
  console.log(name +" : "+`\n`,this, ' / ', new.target, ' / ',
              this instanceof Dog);
  this.name = name;
  this.bark = function () {
    console.log('1️⃣  bark=', new.target, ' / ', this.name, ' / ', name);
  };
  this.bark2 = () =>
    console.log('2️⃣  bark2=', new.target, ' / ', this.name, ' / ', name);
}

// Dog.bark();
// 위에서 Dog는 함수를 선언한 것일 뿐, 호출한 것이 아니다.
// 따라서 하나의 instance라고 할 수 없기 때문에 존재하지 않는다는 에러가 난다.
const dog = Dog('🐶 not new Dog');
// 결과 : <ref *1> Object [global] {...} / undefined /  false
console.log('🐶 not new Dog type=', typeof dog); 
// 결과 : type= undefined
// 일반 함수로서 호출되었기 때문에 반환값이 없다
const newDog = new Dog('🐕 new Dog');
// 결과 :  Dog {} / [Function: Dog] / true
console.log('🐕 new Dog type=', typeof newDog); 
// 결과 : type= object
// 생성자 함수로서 호출되었기 때문에 객체가 반환된다
newDog.bark(); 
// 결과 : 1️⃣  bark= undefined / 🐕 new Dog / 🐕 new Dog
// 일반 함수의 경우 new로 호출되지 않았기 때문에 new.target은 undefined가 된다
// this는 생성된 객체를 가리키기 때문에 this.name은 '🐕 new Dog'이 된다
newDog.bark2(); 
// 결과 : 2️⃣  bark2= [Function: Dog] / 🐕 new Dog / 🐕 new Dog
// 화살표 함수의 new.target은 상위 스코프의 new.target을 따르기 때문에 
// 상위 스코프인 newDog의 new.target인 [Function: Dog]이 된다
// 화살표 함수는 this 바인딩도 상위 스코프를 따르기 때문에 this.name도 '🐕 new Dog'이 된다