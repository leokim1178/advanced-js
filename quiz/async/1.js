// 테스트를 위한 임의의 시간(1초 미만)에 resolve를 실행하는 randTime 함수를 작성하시오.
const rand = (s, e) => Math.random();

const randTime = (val) =>
  new Promise((resolve) => {
    const sec = Math.random() * 1000;
    setTimeout(() => resolve(`randomTime : ${sec}, val : ${val}`), sec);
  });

// const randtime = new Promise((resolve) => {
//   const sec = rand(1, 4) * 500;
//   setTimeout(() => resolve(sec), sec);
// });

randTime(100).then(console.log);

[1, 2, 3, 4, 5].forEach((a) => randTime(a).then(console.log));
