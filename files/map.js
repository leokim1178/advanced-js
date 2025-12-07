let hong = {id:1, name:'홍길동'};
let kim = {id:2, name:'김철수'};
const wm = new WeakMap();
wm.set(hong, {age:30, job:'developer'});
wm.set(kim, {age:25, job:'designer'});
wm.has(hong); // true
let blackList = [hong, kim];
// blackList 배열에서 객체를 제거
hong = null;
kim = null;
console.log(wm.size); // undefined
console.log(wm.get(hong)); // undefined
// 이제 hong과 kim 객체에 대한 참조가 사라졌으므로 가비지 컬렉션의 대상이 된다
// WeakMap wm에서 해당 객체들에 대한 entry도 자동으로 제거된다
// 그런데 만약 Map을 사용했다면?
let hong2={id:1, name:'홍길동'};
let kim2={id:2, name:'김철수'};
const m = new Map();
m.set(hong2, {age:30, job:'developer'});
m.set(kim2, {age:25, job:'designer'});
hong2 = null;
kim2 = null;
// Map m에서는 hong과 kim 객체에 대한 entry가 여전히 남아있다 
console.log(m.size); // 2
console.log(m.get(hong2)); // undefined
// hong2와 kim2 객체에 대한 참조가 사라졌지만 Map m에서는 해당 객체들에 대한 entry가 남아있다