function f1() {
  console.log("f1 실행",  new Date());
}
function f2() {
  console.log("f2 실행", new Date());
}

setImmediate(f2);
setTimeout(f1);
process.nextTick(() => {
  console.log("nextTick 실행", new Date());
});
