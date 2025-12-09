// 다음 코드를 Promise를 이용하여 refactoring 하시오.
// setTimeout(function () {
//   console.log("depth1", new Date());
//   setTimeout(function () {
//     console.log("depth2", new Date());
//     setTimeout(function () {
//       console.log("depth3", new Date());
//       throw new Error("Already 3-depth!!");
//     }, 3000);
//   }, 2000);
// }, 1000);

console.log("START!", new Date());

const depthTimer = (depth) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`depth${depth}`, new Date());
      if (depth === 3) reject("Already 3-depth!!");
      else resolve(depth + 1);
    }, depth * 1000);
  });

depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);
