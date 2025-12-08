### Map
- 

### Map과 Object의 차이점
1. property key의 타입
   - Object: key는 문자열 또는 심볼만 가능
   - Map: key로 모든 타입(원시값, 객체 등) 사용 가능
2. key 타입과 내부 구현
   - Object: key는 문자열 또는 심볼만 가능하며, 숫자는 자동으로 문자열로 변환된다
   - Map: key로 모든 타입(원시값, 객체, 함수 등) 사용 가능하며, 타입이 보존된다
   - 예: `{ 1: 'one', '1': 'one' }`에서 key `1`과 `'1'`은 동일하게 취급된다
   - Map에서는 `1`과 `'1'`이 다른 key로 취급된다
```js
const obj = { 1: 'one', '1': 'one-string' };
console.log(Object.keys(obj)); // ['1']
const map = new Map();
map.set(1, 'one');
map.set('1', 'one-string');
console.log([...map.keys()]); // [1, '1']
```
   - **내부 구조**: Object와 Map 모두 해시 테이블로 구현되어 있다
     - Object: 소량 property는 Hidden Class로 최적화, 대량일 경우 Dictionary Mode(해시맵)로 전환
     - Map: 처음부터 해시맵으로 설계되어 key-value 관리에 최적화됨
   - **성능**: 둘 다 평균 O(1) 접근 속도를 가지지만, Map이 대량의 key-value 쌍을 다루는 데 더 효율적이다
   - **메모리**: Map은 key-value 전용 구조로 메모리 오버헤드가 적고, 잦은 추가/삭제 시 성능이 더 좋다
   - 물론 둘다 property key 의 중복은 존재할수 없다
3. property key의 순서보장
   - Object: ES6부터 삽입 순서를 보장하지만, 숫자형 key는 오름차순으로 정렬되어 관리된다
   - Map: 삽입된 순서를 그대로 유지한다
4. 단순 객체는 이터레이터를 반환하는 메서드가 없다
   - Map은 `map.keys()`, `map.values()`, `map.entries()` 등 이터레이터를 반환하는 메서드를 제공한다
   - Map은 그 자체로 Iterable하다
   - Object는 `Object.keys()`, `Object.values()`, `Object.entries()`를 사용해야 한다
   - Object는 `for...of` 문으로 직접 순회할 수 없으며 `...` 연산자도 사용할 수 없다


### Set
- Set은 이 Map의 key들만 모아놓은 자료구조라고 생각할 수 있다
- 따라서 Map과 마찬가지로 해시맵으로 구현되어 있다
- Map의 property key값을 사용하는 구조이기 때문에 중복 또한 존재할수 없다
- 모를 수 있는 내장 함수(node 22.0 이상에서 추가)
  - `isSubset`: 한 Set이 다른 Set의 부분집합인지 확인
```js
const setA = new Set([1, 2]);
const setB = new Set([1, 2, 3, 4]);
console.log(setA.isSubset(setB)); // true
```
  - `isSuperset`: 한 Set이 다른 Set의 상위집합인지 확인
```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([1, 2]);
console.log(setA.isSuperset(setB)); // true
```
  - `union`: 두 Set의 합집합을 반환
```js
const setA = new Set([1, 2]);
const setB = new Set([3, 4]);
const unionSet = setA.union(setB);
console.log(unionSet); // Set {1, 2, 3, 4}
```
  - `intersection`: 두 Set의 교집합을 반환
```js
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);
const intersectionSet = setA.intersection(setB);
console.log(intersectionSet); // Set {2, 3}
```
- `symmetricDifference`: 두 Set의 대칭차집합을 반환
```js
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);
const symmetricDiffSet = setA.symmetricDifference(setB);
console.log(symmetricDiffSet); // Set {1, 2, 4, 5}
```
- `isDisjoint`: 두 Set이 서로소인지 확인
```js
const setA = new Set([1, 2]);
const setB = new Set([3, 4]);
console.log(setA.isDisjoint(setB)); // true
``` 

### Set과 Array의 차이점
1. 중복 허용 여부
   - Array: 중복된 값을 허용한다
   - Set: 중복된 값을 허용하지 않는다
2. 주요 연산의 시간 복잡도
   - Array: 검색, 삭제, 추가 연산이 평균적으로 O(n)이다
   - Set: 검색, 삭제, 추가 연산이 평균적으로 O(1)이다
3. 순서 보장
   - Array: 삽입된 순서를 그대로 유지한다
   - Set: 삽입된 순서를 그대로 유지한다
4. 주요 사용 목적
    - Array: 순서가 있는 데이터 목록을 다룰 때 사용한다
    - Set: 중복이 없는 유일한 값들의 집합을 다룰 때 사용한다

## WeakMap과 WeakSet
- WeakMap과 WeakSet은 Map과 Set의 변형으로, 키나 값이 가비지 컬렉션의 대상이 될 수 있다

### WeakMap
- key는 반드시 객체여야 한다 (원시값은 불가능)
- **약한 참조(weak reference)**: key 객체가 다른 곳에서 참조되지 않으면 가비지 컬렉션의 대상이 된다
- key 객체가 GC되면 해당 entry가 WeakMap에서 자동으로 제거된다
- WeakMap은 key에 대한 약한 참조만 유지하므로, 메모리 누수를 방지할 수 있다
- iterable하지 않다 (순회 불가능)
- size, clear 메서드가 없다 (크기를 알 수 없음)
- 사용 가능한 메서드: `get()`, `set()`, `has()`, `delete()`만 제공
- 주요 사용 목적:
  - 객체에 대한 메타데이터 저장
  - private-like 속성 구현
  - 메모리 누수 방지
  - 캐싱 (객체가 사라지면 캐시도 자동 정리) 

```js
let obj={'1':11,'2':22,'3':33}
const m=new Map();
m.set(obj,'some meta data');
console.log(m.get(obj)); // 'some meta data'
obj = {id:100}; // obj가 가리키던 원래 객체에 대한 참조가 사라짐
// 이제 원래 객체는 가비지 컬렉션의 대상이 된다
console.log(m.get(obj)); // undefined, 하지만 m에는 여전히 원래 객체에 대한 entry가 남아있다
```
- 주소가 바뀌어도 Map에서는 여전히 남아있다는 것을 알수 있다
- 마찬가지로 WeakMap에서도 key값의 주소가 바뀌면 WeakMap에서 유실된다

- 그렇다면 왜 굳이 WeakMap을 사용하는지 알아보자
```js
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
``` 
- 그래서 WeakMap은 좀 더 가볍고 메모리 누수를 방지할 수 있는 자료구조이다
- 뭐 그래도 딱히 쓸일이 많지는 않다


