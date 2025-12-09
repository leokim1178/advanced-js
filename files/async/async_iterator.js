function iter(vals) {
  let i = -1;
  return {
    async next() {
      i += 1;
      return { value: await afterTime(vals[i]), done: i >= 3 };
    },
  };
}

const it = iter([1, 2, 3]);
console.time("iter");
console.log("1=", await it.next());
console.log("2=", await it.next());
console.log("3=", await it.next());
console.log("4=", await it.next());
console.timeEnd("iter");
