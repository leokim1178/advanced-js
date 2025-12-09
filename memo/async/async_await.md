async/await

- 문법적 설탕
  async 함수는 Promise를 반환
  await 은 resolve,reject를 대신한다
  yield랑 비슷하지 않아?
  next는 resolve랑 비슷하고
  ES2020부터는 최상위 수준(전역/모듈) await 사용 가능

### map에서의 실수

```js
const mapResult = [1, 2, 3].map(async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r;
});
console.log("mapResult=", mapResult);
```

// mapResult= [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

- 위와 같이 Promise 배열이 반환된다
- 따라서 모든 비동기 처리가 끝난 후 값을 얻으려면 `Promise.all`을 사용해야 한다

```js
Promise.all(mapResult).then((results) => {
  console.log("results=", results);
});
```

### filter에서의 실수

```js
const odds = [1, 2, 3].filter(async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r % 2 === 1;
});
console.log("odds=", odds);
```

// odds= [ 1, 2, 3 ]

- filter 콜백은 true/false를 반환해야 하지만 async 함수는 Promise를 반환한다
- 따라서 모든 요소가 true로 간주되어 원본 배열이 반환된다
- filter에서 비동기 처리를 하려면 `for...of` 루프를 사용해야 한다
- 아래 예제를 보자

```js
async function filterAsync(arr, predicate) {
  const result = [];
  for (const item of arr) {
    if (await predicate(item)) {
      // predicate는 홀짝 검증 함수
      result.push(item);
    }
  }
  return result;
}
filterAsync([1, 2, 3], async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r % 2 === 1;
}).then((odds) => {
  console.log("odds=", odds);
});
```

### Promise 실수 3 : 불필요한 객체 반환

```javascript
const myFetch = () =>
  new Promise((resolve, reject) =>
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject)
  );
```

- 위 코드는 불필요하게 Promise를 생성하고 있다
- fetch가 이미 Promise를 반환하므로, 단순히 체이닝만 하면 된다

```javascript
const myFetch = () =>
  fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
    res.json()
  );
```

- Promise 객체가 겹겹히 싸일수록 쓰레드가 계속 사용된다
- 마이크로 태스크 큐에 쌓이는 작업이 많아지면 성능 저하가 발생할 수 있다

### Promise 실수 4 : Promise 결과 반환

```javascript
Promise 결과 반환

let result;
promiseFn().then(res =>
  result = res;
);
otherFunction(result);
```

- 위 코드는 `otherFunction`이 `promiseFn`의 결과를 받기 전에 실행될 수 있다
- 따라서 `otherFunction`이 `undefined`를 받게 될 수 있다
- 올바른 방법은 `then` 내부에서 `otherFunction`을 호출하는 것이다

```javascript
promiseFn().then((res) => {
  otherFunction(res);
});
```

### Promise 실수 5 : Promise 오류 처리

```javascript
// 단, next는 비동기, getRow는 동기 함수!
// https://npmtrends.com/mysql-vs-mysql2

const getAllUsers = (sql) =>
  new Promise((resolve, reject) =>
    query.execute(sql, (err, rs) => {
      if (err) reject(err);

      const results = [];
      while (rs.next())
        results.push(rs.getRow());

      resolve(results);
    });
  );
execute(sqlStr, cb) {
   conn.query(sqlStr)
    .then(res => cb(null, res))
    .catch(err => cb(err))
}
```

- rs.next()는 비동기 함수이므로 await가 필요하다
- 만약 err가 발생하면 이후 코드가 계속 실행된다
- 따라서 내부의 실행을 async 함수로 감싸야 한다

```javascript
const getAllUsers = (sql) =>
  new Promise((resolve, reject) =>
    query.execute(sql, (err, rs) => {
      if (err) reject(err);

      const results = [];
      (async function() {
        do {
          const row = await rs.next(); // promise
          if (!row) break;
          results.push(row);
        } while();
       )();

    });
  );
```

### Promise 실수 6 : 아무것도 하지 않는 핸들러 : 다음에서 불필요한 코드는?

```js
try {
  randTime(1)
    .then((res) => res)
    .then((res) => {
      console.log("res>>", res);
      throw new Error("XXX");
    })
    .catch((err) => {
      console.log("error!!!", err);
      throw err;
    });
} catch (Err) {
  console.error("@@@@@@@Err>>", Err);
}
```

- 위에서 try...catch는 아무런 의미가 없다
- 첫번째 then의 콜백함수는 태스크 큐에 들어간다
- 따라서 try...catch 블록에서 에러를 잡을수 있는 것은 randTime(1)에서 발생한 동기 에러 뿐이다
- 혹은 그냥 간단하게 아래와 같이 하는게 더 좋다

```js
try {
  a = await randTime(1);
  throw new Error("XXX");
} catch (err) {
  console.error("err>>", err);
}
```

- async/await이 갖는 가장 큰 장점은 try...catch 문법을 사용할 수 있다는 것이다

### Promise 실수 7 : 잘못된 await

```js
async function myRequest(url) {
  const response = await fetch(url);
  return await response.json();
}
```

- await이 불필요하게 두번 사용되었다
- async 함수는 자동으로 Promise를 반환한다
- 따라서 리턴할때 await을 쓴다해도 어차피 myRequest는 Promise를 반환한다
- 어차피 받는 쪽에서도 await을 써야 하기때문에 불필요하다

### for await ... of

```js
const afterTime = (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));
console.time("for-await-of");
const arr = [afterTime(1), afterTime(2)];

for (const fo of arr.values()) {
  console.log("fo=", fo);
}

for await (const fao of arr.values()) {
  console.log("fao=", fao);
}

console.timeEnd("for-await-of");
```

// fo= Promise { <pending> }

- 이 방법에는 전제조건이 있다
- ES2022부터 지원되며 Top-level await 환경에서 사용하려면 모듈로 작성해야 한다
