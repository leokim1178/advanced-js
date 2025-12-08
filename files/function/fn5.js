globalThis.name = 'Global Name';

const obj = {
  name: 'Obj Name',
  printName() {
    console.log(this.name);
  },
};

const printName = obj.printName;
printName();
// 결과 : 'Global Name'
// 일반 함수로서 호출되었기 때문에 this는 전역 객체를 가리킨다
// 따라서 this.name은 'Global Name'이 된다

const boundPrintName = obj.printName.bind(obj);
boundPrintName();
// 결과 : 'Obj Name'
// bind 메서드를 사용하여 this를 obj에 영구적으로 바인딩했기 때문에
// this는 항상 obj를 가리키고, this.name은 'Obj Name'이 된다

// 따라서 객체 내의 this.메서드를 일반 함수로 호출할 때
// this 바인딩을 유지하려면 bind를 사용해야 한다
// 혹은 이렇게 해도 된다

const boundPrintName2 = obj.printName.call(obj);
// call 메서드를 사용하여 즉시 obj를 this로 바인딩하여 호출한다
// 이 경우에도 this는 obj를 가리키고, this.name은 'Obj Name'이 된다
