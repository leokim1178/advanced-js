const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());

const randtime = new Promise((resolve) => {
  const sec = rand(1, 4) * 500;
  setTimeout(() => resolve(sec), sec);
});

const randTime = () =>
  new Promise((resolve) => {
    const sec = rand(1, 4) * 500;
    setTimeout(() => {
      console.log("sec=", sec);
      resolve(sec);
    }, sec);
  });

console.time("promi");

// 병렬 수행
Promise.all([
  randTime(),
  randTime(),
  // Promise.reject("에러!"),
  randTime(),
])
  .then(
    (
      arr // 항상 리턴값은 배열이다
    ) =>
      // 동시에 세개가 진행된다 : 비동기
      // 모두 완료된 후에 then이 실행된다
      // 훨씬 빠르다
      {
        console.table(arr);
        // sec= 500
        // sec= 1000
        // sec= 2000
        // ┌─────────┬────────┐
        // │ (index) │ Values │
        // ├─────────┼────────┤
        // │ 0       │ 2000   │
        // │ 1       │ 500    │
        // │ 2       │ 1000   │
        // └─────────┴────────┘
        // 이렇게 되는 이유는?
        // 위의 console.log("sec=", sec); 는 빨리 끝났으니 빨리 찍힌것 뿐이다
        // 실제로 Promise.all 상의 순서는 console.table의 인덱스 순서와 같다
        return console.timeEnd("promi");
      }
  )
  // UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "에러!".
  // catch문을 작성해야 한다
  // 들어간 Promise중에 하나라도 reject되면 바로 catch로 간다
  .catch((err) => console.log("에러발생!", err));

Promise.allSettled([
  randTime(),
  randTime(),
  Promise.reject("에러!"),
  randTime(),
])
  .then(
    (
      arr // 항상 리턴값은 배열이다
    ) =>
      // 모든 Promise가 끝날때까지 기다린다
      {
        console.table(arr);
        // sec= 500
        // sec= 1000
        // sec= 2000
        console.log(arr[0]); // { status: 'fulfilled', value: 2000 }
        console.log(arr[2]); // { status: 'rejected', reason: '에러!' }
        // ┌─────────┬─────────────┬───────┬─────────┐
        // │ (index) │ status      │ value │ reason  │
        // ├─────────┼─────────────┼───────┼─────────┤
        // │ 0       │ 'fulfilled' │ 2000  │         │
        // │ 1       │ 'fulfilled' │ 1000  │         │
        // │ 2       │ 'rejected'  │       │ '에러!'  │
        // │ 3       │ 'fulfilled' │ 500   │         │
        // └─────────┴─────────────┴───────┴─────────┘
        return console.timeEnd("promi");
      }
  )
  .catch((err) => console.log("에러발생!", err));
