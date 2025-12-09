const afterTime = (val) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, val * 1000);
  });

const odds = [1, 2, 3].filter(async (val) => {
  const r = await afterTime(val);
  console.log(r);
  return r % 2 === 1;
});
console.log("odds=", odds);

const odds2 = [1, 2, 3].map(afterTime);
console.log("odds2 (Promise[])=", odds2);
const odds2Awaited = await Promise.all(odds2);
console.log("odds2Awaited (number[])=", odds2Awaited);
const filtered = odds2Awaited.filter((val) => val % 2 === 1);
console.log("filtered (number[])=", filtered);
