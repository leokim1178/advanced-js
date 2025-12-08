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
} // 블록 종료: obj2는 스코프 밖, WeakMap의 obj2는 GC 대상

console.log('\n=== 블록 스코프 종료 후 ===');
console.log('Map size:', m.size); // 2
// obj1과 obj2는 GC 대상이 되었지만 Map에서는 여전히 참조가 남아있다
console.log('WeakMap size:', wm.size); // undefined (크기 확인 불가)
// obj1은 null, obj2는 스코프 밖이므로 GC 대상이 되어 WeakMap에서 제거됨
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