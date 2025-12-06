const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
// process라고 하는것은 현재의 터미널 인터페이스 전체를 의미한다

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
  // 이 콜백은 터미널 창에서 답변을 했을때 answer에 담아 답변을 출력한다
});

rl.on('close', function () { // 이건 event listener
    // onClick은 클릭을 기다리는 event listener
    // onChange는 변화가 있을 때까지 기다리는 event listener
    // 그래서 이곳의 'close'는 rl.close()가 호출될 때까지 기다리는 event listener이다
    // 이것도 event-driven programming의 한 예이다
    console.log('\nBYE BYE !!!');
  process.exit();
});