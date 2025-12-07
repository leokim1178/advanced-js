const ws = new WeakSet();
const s = new Set();

console.log('=== 초기 상태 ===');
console.log('WeakSet:', ws);
console.log('Set:', s);

{
  let obj1 = { id: 1 };
  const obj2 = { id: 2 };
  
  console.log('\n=== 블록 스코프 내부: obj1, obj2를 WeakSet과 Set에 추가 ===');
  console.log('obj1:', obj1);
  console.log('obj2:', obj2);
  
  ws.add(obj1);
  s.add(obj1);
  console.log('WeakSet has obj1:', ws.has(obj1));
  console.log('Set has obj1:', s.has(obj1));

  ws.add(obj2);
  s.add(obj2);
  console.log('WeakSet has obj2:', ws.has(obj2));
  console.log('Set has obj2:', s.has(obj2));

  console.log('\n=== obj1을 null로 변경 ===');
  obj1 = null; // obj1 주소 변경
  console.log('obj1:', obj1);
  console.log('WeakSet has obj1 (null):', ws.has(obj1));
  console.log('Set has obj1 (null):', s.has(obj1)); // Set은 원래 객체를 여전히 참조
} // 블록 종료: obj1, obj2는 스코프 밖, WeakSet의 객체들은 GC 대상

console.log('\n=== 블록 스코프 종료 후 ===');
console.log('Set size:', s.size); // 2 (여전히 객체 참조 유지)
console.log('WeakSet size:', ws.size); // undefined (크기 확인 불가)
console.log('WeakSet:', ws);
console.log('Set:', s);
console.log('Set values:', [...s]); // Set에 저장된 객체들 확인