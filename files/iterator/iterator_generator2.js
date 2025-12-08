function* gener(){
    const x = yield 1;
    const y = yield x+10;
    console.log(`x: ${x}, y: ${y}`);
    return x + y;
}

const it= gener();
console.log(it.next()); // { value: 1, done: false }
// 첫번째 next() 호출로 첫번째 yield까지 도달
// yield 때문에 마무리를 못짓고 있었던 1이 마무리가 된다
// 우측 statement가 비워지면서 { value: 1, done: false } 을 it에 반환하고 일시정지
// 현재 x는 값을 기다리고 있는 중이다
console.log(it.next(3)); // { value: 13, done: false }
// next(3)로 호출했으므로 yield에 3이 전달된다
// yield에 전달된 3이 x에 할당되고, 두번째 yield가 실행되어 value값에 x+10으로 { value: 13, done: false } 반환하고 일시정지
// 마찬가지로 현재 y는 값을 기다리고 있는 중이다
console.log(it.next(5)); // x: 3, y: 5 \n { value: 8, done: true }
// next(5)로 호출했으므로 yield에 5가 전달된다
// yield에 전달된 5가 y에 할당되고, return문이 실행되어 { value: 8, done: true } 반환하고 종료