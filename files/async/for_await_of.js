// Top-level await를 사용하려면 package.json에 "type": "module" 필요

const afterTime = (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));
console.time("for-await-of");
const arr = [afterTime(1), afterTime(2)];

for (const fo of arr.values()) {
  console.log("fo=", fo); // Promise 객체 출력
}

// for await...of는 top-level에서 사용 (ES2022)
for await (const fao of arr.values()) {
  console.log("fao=", fao); // resolve된 값 출력 (1, 2)
}

console.timeEnd("for-await-of");
