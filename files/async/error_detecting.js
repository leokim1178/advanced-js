function f() {
  try {
    setTimeout(() => {
      console.log(new Date());
      throw new Error("어디로?");
    }, 1000);
  } catch (err) {
    console.error("잡히나?", err);
  }
}
f();

// 이렇게 함수를 짜면
// 에러는 try-catch 밖으로 나가버린다.
// 콜백 큐에 들어갔다가 나중에 실행되는데 그때 에러 쓰로잉을 했을때는 f() 함수 스코프를 벗어나버린 상태이기 떄문에
// 에러는 전역환경에서 발생하게 된다
