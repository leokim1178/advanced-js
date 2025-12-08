
// i/o polling
const fs = require('fs'); // CJS
fs.readFile('a.js', result => {
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate2');
  });
  process.nextTick(() => console.log('nextTick2'));
});

// 1. readFile이 실행되고 다른 일이 없기때문에 main thread는 i/o polling으로 넘어감
// 2. i/o polling에서 readFile이 완료되면 callback함수를 호출한다
// 3. timer queue에 setTimeout2가 들어간다
// 4. check queue에 setImmediate2가 들어간다
// - timer phase -> i/o polling -> check phase 순서이기 때문에 언제나 setImmediate가 setTimeout보다 먼저 실행된다
// 5. 전체적으로 보면 timerqueue에도 cb가 있고, checkqueue에도 cb가 있지만,
//    i/o polling 다음에 살펴볼 queue는 check queue이기 때문에 setImmediate가 먼저 실행된다