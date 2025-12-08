// 다음 코드는 올바른가?

function getDiffMillis(dt1, dt2) {
  const d1 = new Date(dt1);
  // d1의 타입은 Date Object
  const d2 = new Date(dt2);

  const { getTime: getTime1 } = d1;
  const { getTime: getTime2 } = d2;
  // return getTime1() - getTime2(); //TypeError: this is not a Date object.
  // 여기서 this가 Date Object가 아니라는 뜻이다
  // 여기의 this는 무엇인가? -> 바로 Global Object
  //그러니 getTime을 bind해주면 될것이다
  // return getTime1.bind(d1)() - getTime2.bind(d2)();
  // or
  return getTime1.apply(d1) - getTime2.apply(d2);
}
getDiffMillis('2021-01-01', '2021-01-02'); 
console.log(getDiffMillis('2021-01-01', '2021-01-02')); // -86400000