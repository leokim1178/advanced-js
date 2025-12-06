class Obj {
  constructor(name) {
    this.name = name;
  }
}


class ItObj extends Obj {
  [Symbol.iterator]() {
 let idx = 0;
  const names = this.name.split(/,\s?/);
  return {
    next() {
      return { value: names[idx++],
         done: idx > names.length };
    }
  };
}
}


class ItObj2 extends Obj {
  *[Symbol.iterator]() { // 이렇게 함수 앞에 *를 붙이면 제너레이터 함수가 된다
    const names = this.name.split(/,\s?/);
    for (let i = 0; i < names.length; i++) { 
      yield names[i];
    };
  }
} 






const iObj = new ItObj2('Toby, Max, Sam');
for (const d of iObj) 
  console.log(d);

console.log([...iObj]);  // 4회 반복