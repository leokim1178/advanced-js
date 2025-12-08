// 다음 코드에 있는 template 함수를 작성하세요.

const before = () => console.log('before....');
const after = (result) => console.log('after...', result);

const someFn = (name, greeting) => `${greeting}, ${name}`;
const someFn2 = (id, nickname, email, level) => `${id}/${nickname}/${email}/${level}`;

const template = // 코드를 완성하세요.
(fn)=>{
    return (...args) =>{
        before();
        const result =fn(...args);
        // setTimeout(()=>after(result),0) // function declaration에 하나 더 등록해야한다(비효율적)
        // timer 큐 -> 시간을 알아야하니 커널에게 부탁을 한다 -> 콜백 -> 
        // setImmediate(after,result)
        // check 큐 ->
        process.nextTick(after,result)
        // nextTick 큐 -> 가장 빠름 (브라우저에서 할때는 이걸 쓰면 안된다 제품마다 다르기 떄문)
        return result
    }
}

const temp1 = template(someFn);  // before → someFn → after 실행
const temp2 = template(someFn2);  // before → someFn2 → after 실행

console.log('temp1')
temp1('sico', 'hello');
console.log('temp2')
temp2(1, 'sico', 'sico@gmail.com', 5)