// 오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
const total = { price: 45000, vat: 4500 };
const fmt = (txts, value) => {
  console.log(txts);
  return `${txts[0]}${value.toLocaleString()}${txts[1]}`;
};

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);
