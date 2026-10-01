console.log("START");
// 1. 콜스택에 올림
// 2. "START" 출력
// 3. console.log("START") 콜스택 POP

// 4. setTimeout 함수를 콜스택에 올림
// Background + Scheduler로 이동
// 콜백은 API Container에 저장
// 타이머는 OS 커널에 부탁해놓는다 (nextTickQueue)
// (2026-10 정정) Node에서 타이머는 libuv가 관리하고, 만료된 콜백은 이벤트 루프의 timers 단계에서 실행된다.
// nextTickQueue는 process.nextTick 전용 큐라 타이머와 무관하다. 출처: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
// 5. 1000ms 이후에 cb가 저장되어있는 API Container에 interrupt를 건다
// 저장되어있는 cb이 Task Queue로 이동
// 이제 이벤트 루프는 콜스택이 비어있는지 확인
// 콜스택에는 console.log("END!")가 남아있음
// 이벤트 루프는 일단 콜백 큐를 대기시킨다
// 6. 콜스택에 console.log("END!") 올림
// 7. "END!" 출력
// 8. console.log("END!") 콜스택 POP
// 9. 이제 콜스택이 비어있으므로 이벤트 루프가 Task Queue를 확인
// Task Queue에 있는 cb를 콜스택에 올림
// 10. "Callback!" 출력
// 11. cb 콜스택 POP
setTimeout(function cb() {
  console.log("Callback!");
}, 1000);
console.log("END!");
