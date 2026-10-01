const wm = new WeakMap();
const m = new Map();
let obj1 = { id: 1 };
let x = { id: 10 };

console.log('=== 초기 상태 ===');
console.log('obj1:', obj1);
console.log('x:', x);

{
  const obj2 = { id: 2 };
  console.log('\n=== 블록 스코프 내부: obj1, obj2를 WeakMap과 Map에 추가 ===');
  
  wm.set(obj1, 1);
  m.set(obj1, 1);
  console.log('WeakMap has obj1:', wm.has(obj1));
  console.log('Map has obj1:', m.has(obj1));

  wm.set(obj2, x);
  m.set(obj2, x);
  console.log('WeakMap has obj2:', wm.has(obj2));
  console.log('Map has obj2:', m.has(obj2));

  console.log('\n=== obj1을 null로 변경, obj2.id 수정, x 재할당 ===');
  obj1 = null; // obj1 주소 변경!
  obj2.id = 3;
  x = { id: 100 };
  
  console.log('obj1:', obj1);
  console.log('obj2:', obj2);
  console.log('x:', x);
  console.log('WeakMap has obj1 (null):', wm.has(obj1));
  console.log('WeakMap has obj2:', wm.has(obj2)); // obj2의 id가 바뀌었지만 주소는 동일하므로 true
  console.log('Map has obj1 (null):', m.has(obj1));
  console.log('Map has obj2:', m.has(obj2)); // obj2의 id가 바뀌었지만 주소는 동일하므로 true
} // 블록 종료: obj2는 스코프 밖 (2026-10 정정) 하지만 Map m이 같은 객체를 강하게 참조하므로 GC 대상 아님 → WeakMap 항목도 유지

console.log('\n=== 블록 스코프 종료 후 ===');
console.log('Map size:', m.size); // 2
// (2026-10 정정) Map이 참조를 들고 있으니 obj1·obj2가 가리키던 객체는 GC 대상이 아니다
console.log('WeakMap size:', wm.size); // undefined (크기 확인 불가)
// (2026-10 정정) 같은 객체를 Map m이 잡고 있어 WeakMap에서도 제거되지 않는다. 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
console.log('Map has obj1 (null):', m.has(obj1));
// 참조는 남아있지만 obj1은 null이므로 false
console.log('Map has obj2:', m.has({ id: 3 })); 
// 새로운 객체이므로 false, obj2의 주소를 알 수 없으므로 확인 불가
console.log('WeakMap has obj1 (null):', wm.has(obj1)); 


console.log('\n=== Map의 keys와 values ===');
console.log('Map keys:', [...m.keys()]);
console.log('Map values:', [...m.values()]);
console.log('현재 obj1:', obj1);
console.log('현재 x:', x);