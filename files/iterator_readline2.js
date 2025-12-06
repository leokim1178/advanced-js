const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
// process라고 하는것은 현재의 터미널 인터페이스 전체를 의미한다

// output을 지정하면 입력값이 자동으로 에코(echo)됨
// 입력값이 두 번 출력되는 이유:
// 1. readline이 자동으로 에코 (output 때문)
// 2. console.log에서 한 번 더 출력
// 해결: output을 제거하거나, terminal: false 옵션 추가
const rl = readline.createInterface({ 
    input, 
    output,
    terminal: false  // 자동 에코 비활성화
});

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
//   // 이 콜백은 터미널 창에서 답변을 했을때 answer에 담아 답변을 출력한다
// });
// 이걸 반복해서 사용하려면?

// 안내문 출력
console.log('Please share your thoughts on Node.js. (Type "exit" or "quit" to end)');
rl.on('line',answer =>{
    console.log(`Thank you for your valuable feedback: ${answer}`);

    if(answer.toLowerCase() === 'exit' || answer.toLowerCase() === 'quit'){
        rl.close();
    }
}).on('close', function () { 
    console.log('\nBYE BYE !!!');
    process.exit();
});  

// 중복된 'close' 이벤트 리스너가 있어서 "BYE BYE !!!"가 두 번 출력되었음
// 하나의 이벤트에는 하나의 리스너만 등록해야 함
