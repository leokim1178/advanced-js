## 이터레이터
- iterator는 커서(cursor)와 비슷하다
- next를 갖는다 (2026-10 정정: prev는 없다. 프로토콜이 요구하는 건 next()뿐이고 return/throw는 선택)


### 이터레이터 프로토콜
- next()를 호출하면 {value, done} 객체를 반환
- 
### 이터러블 프로토콜
- Symbol.iterator 메서드를 구현했느냐


### string은 왜 이터레이터일까?
- string은 실제로 heap에 존재해야되거든
- 근데 우리는 primitive로 쓰고있죠
- 그거는 constant pool 떄문에 쓸수 있는거고
- 실제로는 string도 다 heap에 있다
- 왜냐면 우리가 만약 1기가짜리 텍스트 파일이 있어, 그러면 그걸 한번에 다 메모리에 올릴수는 없잖아요
- 그걸 하나씩 iterator로 옮겨야 하거든
- 그래서 string은 기본적으로 iterator이다
- (2026-10 정정) string은 iterator가 아니라 iterable이다. String.prototype[Symbol.iterator]가 정의돼 있어서이고, 위의 메모리 이유와는 관계없다. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols


### 1
```js
const obj = {id:1, name:'obj'};
// 이것은 이터레이터일까?
const arr = [10,20,30];
console.log('🚀 arr : ',...arr)
// console.log('🚀 obj : ',...obj) // TypeError: obj is not iterable

// arr은 이터레이터, obj는 이터레이터이 아니다

const obj2 ={
    id:2,
    name:'obj2',
    // 이터레이터 프로토콜 구현
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
// 보이는 것처럼 obj2는 이터레이터 프로토콜을 구현했다
console.log('🚀 obj2 : ',...obj2) 
// 이제 obj2도 이터레이터로 동작하는것을 알 수 있다

```



for-of문과 spread(...instance)가 가능하면 iterator로 본다

그리고 iterator는 보통 length를 가지고 있다
그런데 모두가 그런것은 아니다
obj.length가 있나?

### instance가 iterable인지 확인하는 방법
```js
function isIterable(instance){
    return typeof instance[Symbol.iterator] === 'function';
}
console.log(isIterable([1,2,3])); // true
function isIterable2(instance){
    return Symbol.iterator in instance && 'next' in instance
}
console.log(isIterable2([1,2,3])); // false
```

### iterable과 iterator의 차이
- iterable: Symbol.iterator 메서드를 구현한 객체
- iterator: next() 메서드를 구현한 객체
- iterable은 iterator를 반환하는 객체
- iterator는 값을 순회하는 객체

### iterable한 객체 만들기
```js
class IterableObj{
    [Symbol.iterator](){
        return this.name.split(',').values();
    }
}

const obj = new IterableObj();
obj.name = 'apple,banana,cherry';

for(const item of obj){
    console.log('🚀 item : ',item)
}
```


### 이터러블하게 만들어야 하는 상황
우리가 실무를 할때, 객체를 이터러블하게 만들어야 하는 상황이 반드시 존재한다
인스타그램같은 서비스를 만들때를 가정하자
최소한 다섯개의 피드는 보여야할것이다
그럼 당겨서 새로고침을 한다고 하면 계속 올라오면서 인피니티 스크롤이 되어야할것이다
그러려면 적어도 그떄마다 20개에서 30개의 피드는 불러와야 할것이다
그래야 부드럽게 올라가겠지
200개를 받아왔다고 하자
그럼 그 200개의 피드중에서 20개씩 잘라서 보여줘야 할것이다
그러면 iterator로 하나씩 불러오면서 화면을 그리면 된다
그래서 DOM을 만들어서 하나씩 푸시하면 될것이다

### 제너레이터
이렇게 이터레이터를 쉽게 만들수 있는 방법이 제너레이터이다
```js
function* generatorFunction(){}
```
이렇게 함수 옆에 *를 붙이면 제너레이터 함수가 된다
제너레이터 함수는 호출하면 이터레이터를 반환한다

원래 제너레이터의 출현은 iterator를 만들려고 한것이 아니다
제너레이터는 비동기 처리를 쉽게 하기 위해서 나온 문법이다
제너레이터가 처음 나왔을 떄는
나를 호출하는 사람에게 제어권을 넘기는 yield가 있다

```js
function* route(){
    const start = yield "출발 역은?"; // yield가 있으므로 router함수에게 제어권을 넘긴다
    // yield 뒤는 그냥 메세지다
    // 이것의 결과인 "출발 역은?"은 accumulator로 들어간다
    // yield 연산자가 나오면 뒤의 값만 호출하고 stop이다
    // 자바스크립트는 싱글 스레드이기 떄문에 멈출떄 halt 상태가 된다
    // yield는 비동기도 아닌데도 동기처럼 작동한다 
    // js엔진에 부탁을 해놓고  halt 상태가 된다
    // 이걸 풀어주는 것이 next()이다
    // next()함수를 부르면 js엔진에서 signal을 보내서 다음 요소로 이동하는 원리다
    const end = yield "도착 역은?";
    return `${start}에서 ${end}까지 가는 길을 안내합니다.`;
}

const router = route();
console.log(`🚀 router : `, router);
// 제너레이터 객체라는 것을 알수 있다
// (2026-10 정정) route()를 호출하면 본문은 아직 한 줄도 실행되지 않고 맨 앞에서 멈춰 있다. 첫 next()에서 첫 yield까지 실행된다
const n1 = router.next();
console.log(`🚀 n1 : `, n1); 
// next() 호출로 첫번째 줄의 yield까지 도달한다
// yield 때문에 마무리를 못짓고 있었던 "출발 역은?"이 마무리가 된다
// 우측 statement가 비워지면서 { value: '출발 역은?', done: false } 을 router에 반환하고 일시정지
// 현재 start는 값을 기다리고 있는 중이다
const n2 = router.next("문래");
console.log(`🚀 n2 : `, n2);
// 그냥 next() 호출하면 start는 undefined가 된다
// next("문래")로 호출했으므로 yield에 "문래"가 전달된다
// yield에 전달된 "문래"가 start에 할당되고, 두번째 yield가 실행되어 { value: '도착 역은?', done: false } 반환하고 일시정지
// 마찬가지로 현재 end는 값을 기다리고 있는 중이다
const n3 = router.next("신림");
console.log(`🚀 n3 : `, n3); 
// next("신림")로 호출했으므로 yield에 "신림"이 전달된다
// yield에 전달된 "신림"이 end에 할당되고, return문이 실행되어 { value: '문래에서 신림까지 가는 길을 안내합니다.', done: true } 반환하고 종료

// generator를 호출하면 iterator가 반환된다
// await이 없으면 Promise를 리턴하는 것처럼 이 제너레이터 함수가 끝나지 않으면 리턴값을 줄수가 없다
// 그래서 이 제너레이터 함수의 리턴타입은 iterator가 된다

```
- 제너레이터 함수는 화살표 함수와 생성자 함수로 표현할수 없으며 function* 키워드로만 선언할 수 있다

### EventDriven
싱글스레드로 가다보면 다른일을 하고 싶을때가 있다
그렇게 되면 BackGround에 의지하고 싶을떄가 있다
그렇다면 브라우저에 있는 Web API에게 부탁을 한다
그럼 Web API는 I/O 관련된 작업은 커널(os의 엔진)에게 맡긴다
커널 작업이 끝나면 interrupt해준다( 작업이 끝났다는 signal을 날린다)
그럼 이때 콜백함수로 담아놓은게 있다면 콜백함수를 태스크 큐에 집어넣을 것이다

이를 EventDriven 방식이라 한다
이거로 서로 다른 영역간,서로 다른 함수간 메세지를 주고 받을 수 있다
이것으로 만들어진게 socketio이다



### 제너레이터를 class에 적용해보기
```js
class Obj {
  constructor(name) {
    this.name = name;
  }
}


class ItObj extends Obj {
  [Symbol.iterator]() {
 let idx = 0;
  const names = this.name.split(/,\s?/);
  return {
    next() {
      return { value: names[idx++],
         done: idx > names.length };
    }
  };
}
}


class ItObj2 extends Obj {
  *[Symbol.iterator]() { // 이렇게 함수 앞에 *를 붙이면 제너레이터 함수가 된다
    const names = this.name.split(/,\s?/);
    for (let i = 0; i < names.length; i++) { 
      yield names[i];
    };
  }
} 






const iObj = new ItObj2('Toby, Max, Sam');
for (const d of iObj) 
  console.log(d);

console.log([...iObj]);  // 4회 반복
```
- ItObj 클래스는 이터레이터 프로토콜을 직접 구현한 것이고 ItObj2 클래스는 제너레이터 함수를 사용하여 이터레이터 프로토콜을 구현한 것이다
- 제너레이터 함수를 사용하면 코드가 더 간결해지고 이해하기 쉬워지는 것을 볼수 있다


### Linkded List
```js
const array = [1,2,3,...];

const list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: {...}
        }
    }
}
```
- 따지고 보면 rest는 다음번의 주소지라고 볼 수 있다 (&2, &3, ... )
- 표를 만들어보면 이렇다
| value | rest |
|-------|------|
|   1   |  &2  |
|   2   |  &3  |
|   3   |  &4  |
- linked list는 포인터를 이용하여 데이터를 연결하는 자료구조이다
- list 구조는 search는 느리지만 삽입과 삭제가 빠르다

### JS의 array는 list라고 볼 수 있다

JavaScript의 array는 전통적인 의미의 배열(Array)이 아니라 **List**에 가깝다.

**전통적인 배열 (C, Java 등):**
- 메모리에 **연속적으로** 할당된다
- 각 요소의 크기가 **동일**해야 한다
- 인덱스로 직접 계산 가능: `주소 = 시작주소 + (인덱스 × 요소크기)`
- 따라서 O(1)의 **진짜 랜덤 액세스**가 가능하다

```c
int arr[5] = {1, 2, 3, 4, 5};
// 메모리: [1][2][3][4][5] <- 연속적으로 배치
// arr[3]의 주소 = arr의 시작주소 + (3 × 4바이트)
```

**JavaScript의 array:**
- 메모리에 **연속적으로 할당되지 않을 수 있다**
- 각 요소의 타입과 크기가 **다를 수 있다**
- 실제로는 **객체(해시 테이블)**로 구현되어 있다
- 인덱스는 단지 **프로퍼티 키**일 뿐이다

```js
const arr = [1, "hello", {a: 1}, function() {}, null];
// 1 (number), "hello" (string), {a:1} (object), function (object), null (특수값)
// 모두 타입과 크기가 다르다!
```

**왜 List에 가까운가?**

1. **동적 크기 조정**: `push()`, `pop()`, `shift()`, `unshift()` 등이 자유롭다
2. **타입 혼합 가능**: 다양한 타입을 한 배열에 넣을 수 있다
3. **희소 배열 가능**: `const arr = []; arr[100] = 1;` 같은 것이 가능하다
4. **실제 구현**: V8 엔진은 최적화를 위해 경우에 따라 다르게 구현한다
   - 요소가 연속적이고 타입이 같으면 → **진짜 배열처럼** 최적화
   - 희소하거나 타입이 섞이면 → **해시맵(Dictionary)** 으로 구현
   - (2026-10 정정) V8에서 타입이 섞인 배열은 PACKED_ELEMENTS, 구멍이 있는 배열은 HOLEY_* 로 여전히 fast elements다. Dictionary 모드는 arr[1000000] = 1처럼 아주 희소할 때만 간다 (node --allow-natives-syntax로 확인). https://v8.dev/blog/elements-kinds

```js
const arr1 = [1, 2, 3, 4, 5];           // 최적화: 연속 메모리
const arr2 = [1, "two", {}, null];      // PACKED_ELEMENTS (해시맵 아님, 2026-10 정정)
const arr3 = [];
arr3[1000000] = 1;                       // 희소 배열: 해시맵으로 구현
```

**따라서:**
- JavaScript의 array는 겉으로는 배열처럼 보이지만
- 내부적으로는 **List**(또는 해시맵)에 가까운 동작을 한다
- C나 Java의 배열과는 근본적으로 다른 자료구조다

이것이 JavaScript array를 "list라고 볼 수 있다"고 표현한 이유다.

### JavaScript Array의 시간복잡도

JavaScript array의 시간복잡도는 **V8 엔진의 최적화 방식에 따라 다르다**.

**최적화된 경우 (Fast Elements):**
```js
const arr = [1, 2, 3, 4, 5]; // 연속적이고 타입이 같음
```
- **접근 (arr[i])**: O(1) - 전통적 배열처럼 동작
- **push()**: O(1) (평균) - 배열 끝에 추가
- **pop()**: O(1) - 배열 끝에서 제거
- **shift()**: O(n) - 모든 요소를 이동해야 함
- **unshift()**: O(n) - 모든 요소를 이동해야 함

**해시맵으로 구현된 경우 (Dictionary Mode):**
```js
const arr = [];
arr[1000000] = 1; // 희소 배열
// 또는
const arr2 = [1, "two", {}, null]; // 타입이 섞임 (이건 Dictionary 모드가 아니다, 2026-10 정정)
```
- **접근 (arr[i])**: O(1) - 해시 테이블 조회 (평균)
- **push()**: O(1) (평균)
- **pop()**: O(1) (평균)
- **shift()**: O(1) - 해시맵이므로 이동 불필요 (하지만 인덱스 재계산 필요)
- **unshift()**: O(n) - 모든 키를 재계산해야 함

**주요 메서드별 시간복잡도:**

| 메서드 | 최적화된 배열 | 해시맵 배열 | 설명 |
|--------|--------------|------------|------|
| `arr[i]` (접근) | O(1) | O(1) | 둘 다 빠름 |
| `push()` | O(1) | O(1) | 끝에 추가 |
| `pop()` | O(1) | O(1) | 끝에서 제거 |
| `shift()` | O(n) | O(n) | 앞에서 제거, 이동 필요 |
| `unshift()` | O(n) | O(n) | 앞에 추가, 이동 필요 |
| `splice()` | O(n) | O(n) | 중간 삽입/삭제 |
| `indexOf()` | O(n) | O(n) | 순차 검색 |
| `find()` | O(n) | O(n) | 순차 검색 |
| `sort()` | O(n log n) | O(n log n) | 정렬 |

**중요한 차이점:**

전통적 배열은 **항상** O(1) 접근을 보장하지만,
JavaScript 배열은:
1. **최적화된 경우**: O(1) 접근 (전통적 배열과 동일)
2. **해시맵인 경우**: O(1) 평균, 최악의 경우 O(n) (해시 충돌)

**해시 충돌이 발생하는 경우:**

해시맵은 내부적으로 해시 함수를 사용하여 키를 저장 위치로 변환한다. 서로 다른 키가 같은 해시값을 가질 때 충돌이 발생한다.

```js
// JavaScript 객체(해시맵)의 해시 충돌 예시
const obj = {};

// 가상의 예: 만약 "0"과 "16"이 같은 해시 버킷에 저장된다면
obj["0"] = "first";
obj["16"] = "second";   // 해시 충돌 발생 가능
obj["32"] = "third";    // 또 충돌 발생 가능

// V8 엔진이 내부적으로 체이닝(Chaining) 방식으로 처리:
// 버킷[0] -> "0":"first" -> "16":"second" -> "32":"third"
//            ↑ 연결 리스트로 저장
```

**실제로는 이렇게 동작:**

1. **해시 함수 계산**: `hash("0")` → 예: 0번 버킷
2. **충돌 발생**: `hash("16")` → 예: 0번 버킷 (충돌!)
3. **체이닝 처리**: 같은 버킷에 연결 리스트로 저장
4. **검색 시**: 버킷 찾기 O(1) + 체인 순회 O(k) → 최악 O(n)

```js
// 희소 배열에서의 해시 충돌 시나리오
const sparse = [];
sparse[0] = "a";
sparse[100000] = "b";
sparse[200000] = "c";

// 내부적으로 해시맵으로 저장:
// {
//   "0": "a",
//   "100000": "b",  // 만약 hash("100000")이 충돌하면?
//   "200000": "c"   // 체인으로 연결됨
// }

// 접근 시:
console.log(sparse[100000]); 
// 1. hash("100000") 계산 - O(1)
// 2. 버킷 찾기 - O(1)
// 3. 체인 순회 (충돌 시) - O(k), 최악 O(n)
```

**V8의 충돌 해결 방법:**

1. **체이닝(Chaining)**: 같은 버킷에 연결 리스트로 저장
2. **오픈 어드레싱(Open Addressing)**: 다른 빈 버킷 찾기
3. **리해싱(Rehashing)**: 테이블 크기 확장

```js
// 극단적인 예: 많은 충돌이 발생하는 경우
const worst = {};
for (let i = 0; i < 10000; i += 16) {
  worst[i] = i; // 만약 모두 같은 버킷에 할당된다면?
}
// 모든 요소가 하나의 체인에 연결됨
// 접근 시간: O(1) → O(n)으로 저하
```

**실제 예시 - 문자열 키의 해시 충돌:**

```js
// 문자열 해시 함수가 충돌을 일으킬 수 있는 경우
const map = {};

// 가정: 다음 문자열들이 같은 해시값을 가진다면
map["FB"] = 1;    // hash("FB") = 2235
map["Ea"] = 2;    // hash("Ea") = 2235 (충돌!)

// 내부 구조:
// 버킷[2235] -> ["FB":1] -> ["Ea":2]
//               ↑ 체인으로 연결

// 접근 시:
console.log(map["Ea"]); 
// 1. hash("Ea") = 2235 계산
// 2. 버킷[2235] 찾기
// 3. 체인 순회: "FB" 확인 → 다름 → "Ea" 확인 → 찾음!
// 시간: O(1) + O(2) = O(체인 길이)
```

**정리:**
- **평균**: O(1) - 충돌이 적을 때
- **최악**: O(n) - 모든 요소가 같은 버킷에 체이닝될 때
- V8은 충돌을 최소화하기 위해 좋은 해시 함수와 동적 리해싱을 사용하지만, 이론적으로 O(n)의 가능성은 존재한다

**예시:**
```js
// 최적화된 경우 - O(1) 접근
const fast = [1, 2, 3, 4, 5];
console.log(fast[3]); // O(1) - 메모리 주소 직접 계산

// 해시맵인 경우 - O(1) 평균 접근
const sparse = [];
sparse[1000000] = "value";
console.log(sparse[1000000]); // O(1) 평균 - 해시 테이블 조회
                               // 하지만 충돌 시 O(k) ~ O(n)
```

**결론:**
- 전통적 배열의 접근: **보장된 O(1)**
- JavaScript 배열의 접근: **평균 O(1), 최악 O(n)**
- JavaScript 배열은 상황에 따라 최적화 방식이 달라지므로 "항상 O(1)"이라고 단정할 수 없다


## List와 Array 상호 변환
```js
const arr = [1, 2, 3];
```
### Array -> List 역방향
```js
let node;
for (let i = arr.length - 1; i >= 0; i--) {
  node = { value: arr[i], rest: node };
}
console.log('🚀 node : ', node);
```

### Array -> List 순방향
```js
let list;
let preNode;
for (let i = 0; i < arr.length; i++) {
  const curNode = {value:arr[i], rest:undefined};
  if(!list){
    list = curNode;
  }else{
    preNode.rest = curNode; 
  }
    preNode = curNode;
}
console.log('🚀 list : ', list);
```

역방향이 더 간단하다

### List -> Array
```js
const arr =[];
let node = list
while(true){
    arr.push(node.value);
    node = node?.rest;
    if(!node) break;
}
console.log('🚀 arr : ', arr);
```

### cf.ReadLine
```js
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});

rl.on('close', function () {
  process.exit();
});
```
