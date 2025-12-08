// getNextWeek 함수는 widx변수에 부수 효과(side effect)가 있다.
// 이를 부수 효과가 없도록 변경하시오.  (hint: closure, IIFE)

// const weeks = ['일', '월', '화', '수', '목', '금', '토'];
// let widx = -1;
// const getNextWeekBad = () => {
//   widx += 1; // side-effect!
//   if (widx >= weeks.length) widx = 0;
//   return `${weeks[widx]}요일`;
// };

const getNextWeekGood= (()=>{
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  let widx = -1;
  return ()=> `${weeks[++widx]}요일`
})();
// const getNextWeek =

// 클로저를 만들어야 한다 & 즉시 실행함수
let cnt = 0;
const intl = setInterval(() => {
  console.log('call', cnt, getNextWeekGood());
  if ((cnt += 1) === 7) clearInterval(intl);
}, 100); 
