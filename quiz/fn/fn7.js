class Dog {
  constructor(name) {
    this.name = name;
  }


  getName() {
    return this.name;
  }

  fn() {
    return 'FN';
  }

  static sfn() { // this와 상관없는 영역
    return 'SFN';
  }
}
const lucy = new Dog('Lucy');
const { sfn } = Dog;
const { name: aa, fn: fnnn, getName } = lucy;


console.log(aa, sfn(), fnnn(), getName); // ?
getName(); // ? // 이건 바인드 해주지 않는이상 쓸수 없다