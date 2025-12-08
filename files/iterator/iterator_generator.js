function* route(){
    const start = yield "출발 역은?"; // yield가 있으므로 router함수에게 제어권을 넘긴다
    // yield 뒤는 그냥 메세지다
    // 이것의 결과인 "출발 역은?"은 accumulator로 들어간다
    // yield 연산자가 나오면 뒤의 값만 호출하고 stop이다
    // 자바스크립트는 싱글 스레드이기 떄문에 멈출떄 halt 상태가 된다
    // yield는 비동기도 아닌데도 동기처럼 작동한다 
    // js엔진에 부탁을 해놓고  halt 상태가 된다
    // 이걸 풀어주는 것이 next()이다
    // next()함수를 부르면 js엔진에서 signal을 보내서 다음 요소로 이동하는 원리다
    const end = yield "도착 역은?";
    return `${start}에서 ${end}까지 가는 길을 안내합니다.`;
}

const router = route();
console.log(`🚀 router : `, router);
// 제너레이터 객체라는 것을 알수 있다
// 첫번째 줄은 yield를 만나 halt되어있으며 next()호출을 기다리고 있다
const n1 = router.next();
console.log(`🚀 n1 : `, n1); 
// next() 호출로 첫번째 줄의 yield까지 도달한다
// yield 때문에 마무리를 못짓고 있었던 "출발 역은?"이 마무리가 된다
// 우측 statement가 비워지면서 { value: '출발 역은?', done: false } 을 router에 반환하고 일시정지
// 현재 start는 값을 기다리고 있는 중이다
const n2 = router.next("문래");
console.log(`🚀 n2 : `, n2);
// 그냥 next() 호출하면 start는 undefined가 된다
// next("문래")로 호출했으므로 yield에 "문래"가 전달된다
// yield에 전달된 "문래"가 start에 할당되고, 두번째 yield가 실행되어 { value: '도착 역은?', done: false } 반환하고 일시정지
// 마찬가지로 현재 end는 값을 기다리고 있는 중이다
const n3 = router.next("신림");
console.log(`🚀 n3 : `, n3); 
// next("신림")로 호출했으므로 yield에 "신림"이 전달된다
// yield에 전달된 "신림"이 end에 할당되고, return문이 실행되어 { value: '문래에서 신림까지 가는 길을 안내합니다.', done: true } 반환하고 종료

// generator를 호출하면 iterator가 반환된다
// await이 없으면 Promise를 리턴하는 것처럼 이 제너레이터 함수가 끝나지 않으면 리턴값을 줄수가 없다
// 그래서 이 제너레이터 함수의 리턴타입은 iterator가 된다
