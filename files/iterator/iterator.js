const obj = {id:1, name:'obj'};
// 이것은 이터레이터일까?
const arr = [10,20,30];
console.log('🚀 arr : ',...arr)
// console.log('🚀 obj : ',...obj) // TypeError: obj is not iterable

// arr은 이터러블, obj는 이터러블이 아니다 (2026-10 정정) 이터레이터 → 이터러블

const obj2 ={
    id:2,
    name:'obj2',
    // 이터러블 프로토콜 구현 ([Symbol.iterator]가 next()를 가진 이터레이터를 반환)
    [Symbol.iterator](){
        let i=0;
        return {
            next: ()=>({
                value: this.name[i++],
                done: i>this.name.length
            })
        }
    }
}
// 보이는 것처럼 obj2는 이터러블 프로토콜을 구현했다
console.log('🚀 obj2 : ',...obj2) 
// 이제 obj2도 이터러블로 동작하는것을 알 수 있다
// (2026-10 정정) 배열·obj2는 [Symbol.iterator]()를 가진 이터러블이고, next()를 가진 쪽이 이터레이터다
// 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
