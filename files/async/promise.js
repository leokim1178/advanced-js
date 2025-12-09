class Promise {
  thenFuncs = [];
  catchFuncs = [];
  constructor(func) {
    func(this.resolve.bind(this), this.reject.bind(this));
  }
  then(f1, f2) {
    this.thenFuncs.push(f1);
    if (f2) this.catchFuncs.push(f2);
  }

  resolve(x) {
    const func = this.thenFuncs.pop();
    func(x);
  }
  reject(e) {
    const func = this.catchFuncs.pop();
    func(e);
  }
}

const promi = new Promise((resolve, reject) => {
  // Promise는 resolve, reject 두개의 함수를 가지고 있는 생성자 함수이다.
  setTimeout(() => {
    const now = Date.now();
    if (now % 2 === 0) resolve(console.log("fulfill", now));
    // resolve를 하는 순간 then이 실행된다
    // resolve는 Promise가 가지고 있는 상태
    else reject(new Error("어디로?"));
  }, 1000);
});

console.log(promi);

promi.then(
  (succ) => console.log("Resolve!"),
  (fail) => console.log("Reject!", fail)
);
