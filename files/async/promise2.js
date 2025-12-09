const promiseFn = (id = 1) =>
  new Promise((resolve, reject) => {
    console.log("id>>", id);
    if (id < 7) resolve(id + 1);
    else reject(new Error("어디로?" + id));
  });

promiseFn() // 1
  .then((res) => {
    console.log("res1>>", res); // 2
    promiseFn(res); // 2 - Promise를 반환하지 않으면 체인에 연결되지 않음
    // return을 안했으므로 다음 then에 undefined가 전달됨 (then은 실행됨!)
  })
  .then((res) => {
    console.log("res2>>", res); // undefined (이전 then에서 return 없음)
    return promiseFn(res ?? 3); // 3 - undefined이므로 3 사용
  })
  .then(promiseFn) // 4 - res를 인자로 받아 promiseFn(4) 실행 후 5 반환
  .then((res) => {
    console.log("res3>>", res); // 5
    return promiseFn(res); // 5 -> 6 반환
  })
  .then(() => promiseFn(4)) // res(6)를 무시하고 4 사용 -> 5 반환
  .then((res) => promiseFn(res)) // 5 -> 6 반환
  .catch((err) => console.log("Error!!>>", err));
