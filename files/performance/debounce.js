const debounce = (cb, delay) => {
  let timer;
  return (...args) => {  
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  } // currying
}
const act = debounce(
    a => a + 1, // 이건 어떤값을 받아서 1을 증가시키는 함수다
    1000); // 보통 0.1초 ~ 0.2초 정도로 설정한다
act(100);
// 1초 동안 n번 호출 => 실행은 1회만!
// 1초 후 => cb(100) 실행
// 1.5초 후
act(100);   // 마지막 호출부터 delay 후 cb 실행!!