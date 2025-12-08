
let runCnt = 0;
// 클로저의 활용
const memoizedTable = {}; // f(3) {3: 3 * 2, 2: 2 * 1}
         // f(5) {5: 120, 4: 24, 3: 6, 2: 2 * 1}
// 이렇게 저장하는 기법을 메모이제이션(memoization) 기법이라고 한다
// 메모이제이션을 사용한 함수를 memoized function이라고 한다
// 메모이제이션 기법을 사용하면 동일한 입력에 대해 여러번 계산하는 비효율성을 제거할 수 있다
// 특히 재귀함수에서 효과적이다

function factorial(n) {
  runCnt += 1; // dummy
  if (n === 1) return 1;
  return memoizedTable[n] 
        || (memoizedTable[n] = n * factorial(n - 1));
}

const f3 = factorial(3);
console.log('🚀  f3:', f3, runCnt);
runCnt = 0;
const f5 = factorial(5);
console.log('🚀  f5:', f5, runCnt);

