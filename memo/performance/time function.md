

### setTimeout
- 딜레이 이후에 이 함수를 한번만 실행해줘

### setInterval
- 딜레이 이후에 이 함수를 반복해서 실행해줘

### setImmediate
- 딜레이 이후에 가능한 빨리 이 함수를 실행해줘(안 급한거니까 나중에 해줘)
- Node.js에서만 사용 가능
- ex)
```js
f1(); // 콜스텍
f2(); // 콜스텍
f3(); // 콜스텍
setImmediate(() => {
 console.log("이 메시지가 나중에 출력됩니다.");
}); // 테스크 이벤트 큐
```


timers
pending callbacks
poll
check
close callbacks
이후
Other Microtasks queue
next tick queue : 1ms의 한틱 마다 실행되는 큐(보통 js는 1ms 기준으로 tick을 돌린다)

위와 같은 순서로 실행된다

다음과 같이 실행했다고 가정해보자
```js
function f1() {
  console.log("f1 실행",  new Date());
}
function f2() {
  console.log("f2 실행", new Date());
}

setImmediate(f2);
setTimeout(f1);
process.nextTick(() => {
  console.log("nextTick 실행", new Date());
});
```

f1은 timers queue에
f2는 check queue에 들어간다

루프가 돈다고 하면
1. call stack이 비어있는지 확인한다
2. 비어있다면 next tick queue를 확인한다
3. next tick queue에 있는 cb를 모두 실행한다
4. call stack이 비어있는지 다시 확인한다    
5. 비어있다면 timer queue를 확인한다
6. timer queue에 있는 cb를 모두 실행한다
7. call stack이 비어있는지 다시 확인한다
8. 비어있다면 pending callbacks queue를 확인한다
9. pending callbacks queue에 있는 cb를 모두 실행한다
10. call stack이 비어있는지 다시 확인한다
11. 비어있다면 poll queue를 확인한다
12. poll queue에 있는 cb를 모두 실행한다
13. call stack이 비어있는지 다시 확인한다
14. 비어있다면 check queue를 확인한다
15. check queue에 있는 cb를 모두 실행한다
16. call stack이 비어있는지 다시 확인한다
17. 비어있다면 close callbacks queue를 확인한다
18. close callbacks queue에 있는 cb를 모두 실행한다
19. call stack이 비어있는지 다시 확인한다
20. 비어있다면 Other Microtasks queue를 확인한다
21. Other Microtasks queue에 있는 cb를 모두 실행한다
22. 다시 1번으로 돌아간다

따라서 위 코드의 실행 순서는 다음과 같다
1. call stack이 비어있으므로 next tick queue를 확인한다
2. next tick queue에 있는 cb를 실행한다 → "nextTick 실행" 출력
3. call stack이 비어있으므로 timer queue를 확인한다
4. timer queue에 있는 cb를 실행한다 → "f1 실행" 출력
5. call stack이 비어있으므로 pending callbacks queue를 확인한다 → 없음
6. call stack이 비어있으므로 poll queue를 확인한다 → 없음
7. call stack이 비어있으므로 check queue를 확인한다
8. check queue에 있는 cb를 실행한다 → "f2 실행" 출력
9. call stack이 비어있으므로 close callbacks queue를 확인한다 → 없음
10. call stack이 비어있으므로 Other Microtasks queue를 확인한다 → 없음
11. 다시 1번으로 돌아간다
위와 같이 setImmediate는 우선순위가 낮다

i/o가 일어날때는 조금 다르다
```js

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

```
1. readFile이 실행되고 다른 일이 없기때문에 main thread는 i/o polling으로 넘어감
2. i/o polling에서 readFile이 완료되면 callback함수를 호출한다
3. timer queue에 setTimeout2가 들어간다
4. check queue에 setImmediate2가 들어간다
- timer phase -> i/o polling -> check phase 순서이기 때문에 언제나 setImmediate가 setTimeout보다 먼저 실행된다
- 전체적으로 보면 timerqueue에도 cb가 있고, checkqueue에도 cb가 있지만,
   i/o polling 다음에 살펴볼 queue는 check queue이기 때문에 setImmediate가 먼저 실행된다