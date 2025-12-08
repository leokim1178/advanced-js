

function currentCount() {
  let currCount = 0; // private variable
  return {
    connect() { currCount += 1; },
    disconnect() { currCount -= 1; },
    getCount() { return currCount; },   // getter method
    get count() { return currCount; },  // readonly getter (accessor)
    // 이 함수들은 모두 curCount 변수를 참조할 수 있는 클로저다
  };
}

const actions = ['입장', '입장', '입장', '퇴장', '입장', '퇴장']; // Status Queue

const counter = currentCount();
for (const action of actions) {
  action === '입장' ? counter.connect() : counter.disconnect();
  console.log(`${action} -> 현재 입장객:  ${counter.count} 명`);
}
console.log('Current User Count=', counter.count);  // counter.getCount()