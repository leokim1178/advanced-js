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

const isParellel = false;
console.time("promi");
if (isParellel) {
  // 병렬 수행
  Promise.all([randTime(), randTime(), randTime()]).then(() =>
    // 동시에 세개가 진행된다 : 비동기
    // 모두 완료된 후에 then이 실행된다
    // 훨씬 빠르다
    console.timeEnd("promi")
  );
} else {
  // 직렬 수행

  // const p = randTime()으로 했을때는 Promise<void>가 된다

  const p = randTime()
    .then((x) => {
      return randTime();
    })
    .then((x) => {
      return randTime();
    })
    .then((x) => {
      return randTime();
    })
    .then(() => console.timeEnd("promi"));
}
