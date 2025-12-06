```js
class Singleton {
    static #_instance; // 외부에서 변경 금지!! // private static이니까 클래스 내부에서만 접근 가능
    // #은 private 필드 선언 문법
    // _는 관례상 protected를 의미한다
    #name;
    #map;
    constructor() {
        if (Singleton.#_instance) 
        // new를 부르면 이 constructor가 호출될것이다 // 근데 이미 인스턴스가 있으면 그 인스턴스를 반환하도록 짜여있는것이다
          return Singleton.#_instance; // 그런데 #_instance는 private이니까 클래스 내부에서만 접근 가능하니까 이렇게 작성할수있는것이다
        this.#name = 'SINGLETON';
        this.load();
        Singleton.#_instance = this; 
        // static이기 떄문에 this로 접근 불가능하기 떄문에 클래스 이름으로 접근해야 한다
        // static 메서드는 정적이기 때문에 메모리에 여러개가 만들어지지 않는다
        // 이제 #_instance는 this, 즉 새로 생성된 인스턴스를 가리키게 된다
        // 따라서 if문 이후에 나오는 이 뒷부분은 한번밖에 타지 않는다
    }

    static getInstance() {
        return this.#_instance || new this();
    }


    load() {
        query(res => { 
                 this.#map = res; });
    }

    reload() {
        this.load();
    }

    print() {  console.log('Print>>', this.#name);  }
}

const s1 = Singleton.getInstance();
const s2 = new Singleton();
console.log('s1 === s2', s1 === s2);
const s3 = Singleton.getInstance();
console.log('s3 === s2', s3 === s2);
s3.print();

```

### Singleton 패턴이란?
- 싱글톤이라는 건 힙, 즉 메모리에 인스턴스가 단 하나만 존재하도록 보장하는 디자인 패턴이다
- 인스턴스가 여러 개 생성되는 것을 방지하여 자원 낭비를 막고, 전역 상태를 관리하는 데 유용하다

### JAVA에서의 싱글톤 패턴
- JAVA에서는 아예 static으로 감싸버린다
```java
public class Singleton {
    private static Singleton instance = new Singleton(); // 클래스 로딩 시점에 인스턴스 생성
    private Singleton() {} // private 생성자
    public static Singleton getInstance() {
        return instance; // 항상 같은 인스턴스 반환
    }
}
```
- 위와 같이 블록을 지정해버린다
- 자바는 멀티쓰레드 방식이기 떄문에 new를 동시에 부를수도 있다. -> constructor로 동시에 진입할 수 있기 떄문에

---

## JavaScript의 접근 제어자 (Access Modifiers)

JavaScript는 전통적인 객체지향 언어와 달리 최근까지 접근 제어자를 공식적으로 지원하지 않았다. ES2022부터 private 필드가 정식으로 추가되었으며, static도 ES6부터 지원된다.

### 1. Public (공개)

JavaScript에서 **기본적으로 모든 프로퍼티와 메서드는 public**이다. 별도의 키워드 없이 선언하면 클래스 외부에서 자유롭게 접근할 수 있다.

**코드블럭 1:**
```js
class User {
    name;  // public 필드
    age;   // public 필드
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // public 메서드
    introduce() {
        console.log(`안녕하세요, ${this.name}입니다. ${this.age}살입니다.`);
    }
}

const user = new User('김철수', 25);
console.log(user.name);      // '김철수' - 외부에서 접근 가능
console.log(user.age);       // 25 - 외부에서 접근 가능
user.introduce();            // 안녕하세요, 김철수입니다. 25살입니다.
user.name = '이영희';         // 외부에서 수정 가능
console.log(user.name);      // '이영희'
```

**설명:**
1. `name`과 `age`는 public 필드로 외부에서 자유롭게 읽고 쓸 수 있다.
2. `introduce()`는 public 메서드로 외부에서 호출 가능하다.
3. public은 별도의 키워드가 필요 없다.

### 2. Private (비공개)

ES2022부터 `#` 접두사를 사용하여 **진짜 private 필드와 메서드**를 선언할 수 있다. private 멤버는 클래스 내부에서만 접근 가능하다.

**코드블럭 2:**
```js
class BankAccount {
    #balance;        // private 필드
    #accountNumber;  // private 필드
    
    constructor(accountNumber, initialBalance) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
    }
    
    // private 메서드
    #validateAmount(amount) {
        if (amount <= 0) {
            throw new Error('금액은 0보다 커야 합니다.');
        }
        return true;
    }
    
    // public 메서드를 통해 private 필드에 접근
    deposit(amount) {
        this.#validateAmount(amount);
        this.#balance += amount;
        console.log(`${amount}원 입금 완료. 잔액: ${this.#balance}원`);
    }
    
    withdraw(amount) {
        this.#validateAmount(amount);
        if (this.#balance < amount) {
            throw new Error('잔액이 부족합니다.');
        }
        this.#balance -= amount;
        console.log(`${amount}원 출금 완료. 잔액: ${this.#balance}원`);
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount('123-456', 10000);
account.deposit(5000);           // 5000원 입금 완료. 잔액: 15000원
console.log(account.getBalance()); // 15000

// console.log(account.#balance);        // SyntaxError! 외부에서 접근 불가
// account.#validateAmount(100);         // SyntaxError! 외부에서 접근 불가
```

**설명:**
1. `#balance`와 `#accountNumber`는 private 필드로 클래스 외부에서 접근할 수 없다.
2. `#validateAmount()`는 private 메서드로 클래스 내부에서만 사용 가능하다.
3. 외부에서 private 멤버에 접근하려고 하면 **SyntaxError**가 발생한다.
4. public 메서드(`getBalance()`, `deposit()` 등)를 통해서만 private 멤버에 간접적으로 접근할 수 있다.

### 3. Protected (보호됨)

JavaScript는 **공식적으로 protected를 지원하지 않는다**. 그러나 관례적으로 `_` 접두사를 사용하여 "이 멤버는 외부에서 사용하지 말아주세요"라는 의미를 표현한다. 하지만 이는 단순한 관례일 뿐, 실제로 접근을 막지는 못한다.

**코드블럭 3:**
```js
class Animal {
    _energy;  // 관례상 protected (실제로는 public)
    
    constructor(energy) {
        this._energy = energy;
    }
    
    _consumeEnergy(amount) {  // 관례상 protected 메서드
        this._energy -= amount;
    }
    
    getEnergy() {
        return this._energy;
    }
}

class Dog extends Animal {
    constructor(energy) {
        super(energy);
    }
    
    bark() {
        console.log('멍멍!');
        this._consumeEnergy(5);  // 자식 클래스에서 접근 가능 (의도된 사용)
    }
}

const dog = new Dog(100);
dog.bark();                    // 멍멍!
console.log(dog.getEnergy());  // 95

// 관례를 무시하면 외부에서도 접근 가능 (권장하지 않음)
console.log(dog._energy);      // 95 - 접근은 가능하지만 하지 말아야 함
dog._consumeEnergy(10);        // 호출은 가능하지만 하지 말아야 함
```

**설명:**
1. `_energy`와 `_consumeEnergy()`는 관례상 protected로 표시되었다.
2. 실제로는 public이므로 외부에서 접근 가능하지만, `_` 접두사를 보고 "사용하지 말아야 할 멤버"임을 알 수 있다.
3. 자식 클래스에서는 자유롭게 사용할 수 있다.
4. **진짜 protected가 필요하다면 private(`#`)를 사용하되, getter/setter를 제공하는 방식을 고려해야 한다.**

### 4. Static (정적)

static 멤버는 **클래스 자체에 속하며, 인스턴스가 아닌 클래스 이름으로 접근**한다. 모든 인스턴스가 공유하는 데이터나 유틸리티 메서드를 만들 때 사용한다.

**코드블럭 4:**
```js
class MathUtils {
    static PI = 3.14159;  // static 필드
    
    static add(a, b) {    // static 메서드
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

// static 멤버는 클래스 이름으로 접근
console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(5, 3));    // 8
console.log(MathUtils.multiply(4, 7)); // 28

// 인스턴스를 만들지 않고도 사용 가능
const utils = new MathUtils();
// console.log(utils.PI);            // undefined - 인스턴스로는 접근 불가
// console.log(utils.add(1, 2));     // TypeError - 인스턴스로는 호출 불가
```

**설명:**
1. `PI`는 static 필드로 클래스 이름(`MathUtils`)으로만 접근 가능하다.
2. `add()`와 `multiply()`는 static 메서드로 인스턴스 없이 호출할 수 있다.
3. **인스턴스를 통해서는 static 멤버에 접근할 수 없다.**

### 5. Static Private (정적 비공개)

static과 private를 함께 사용하면 **클래스 전체에서 공유되면서도 외부에서는 접근할 수 없는** 멤버를 만들 수 있다. Singleton 패턴에서 자주 사용된다.

**코드블럭 5:**
```js
class Counter {
    static #count = 0;  // static private 필드
    #id;
    
    constructor() {
        Counter.#count++;
        this.#id = Counter.#count;
    }
    
    static #resetCount() {  // static private 메서드
        Counter.#count = 0;
    }
    
    getId() {
        return this.#id;
    }
    
    static getCount() {  // static public 메서드
        return Counter.#count;
    }
    
    static reset() {
        Counter.#resetCount();
        console.log('카운터가 리셋되었습니다.');
    }
}

const c1 = new Counter();
const c2 = new Counter();
const c3 = new Counter();

console.log(c1.getId());         // 1
console.log(c2.getId());         // 2
console.log(c3.getId());         // 3
console.log(Counter.getCount()); // 3

Counter.reset();                 // 카운터가 리셋되었습니다.
console.log(Counter.getCount()); // 0

// console.log(Counter.#count);  // SyntaxError! 외부에서 접근 불가
```

**설명:**
1. `#count`는 static private 필드로 모든 인스턴스가 공유하지만 외부에서 접근할 수 없다.
2. `#resetCount()`는 static private 메서드로 클래스 내부에서만 사용 가능하다.
3. public static 메서드(`getCount()`, `reset()`)를 통해서만 간접적으로 접근할 수 있다.

### 6. 접근 제어자 조합 예제

다양한 접근 제어자를 조합한 실전 예제를 살펴보자.

**코드블럭 6:**
```js
class Database {
    static #instance;              // static private - Singleton 인스턴스
    static #connectionCount = 0;   // static private - 연결 수 추적
    
    #connectionString;             // private - 연결 문자열
    #isConnected = false;          // private - 연결 상태
    _maxConnections = 100;         // protected (관례) - 최대 연결 수
    
    constructor(connectionString) {
        if (Database.#instance) {
            return Database.#instance;
        }
        this.#connectionString = connectionString;
        Database.#instance = this;
    }
    
    // private 메서드
    #validateConnection() {
        if (Database.#connectionCount >= this._maxConnections) {
            throw new Error('최대 연결 수를 초과했습니다.');
        }
    }
    
    // public 메서드
    connect() {
        this.#validateConnection();
        this.#isConnected = true;
        Database.#connectionCount++;
        console.log(`데이터베이스 연결 성공. 현재 연결 수: ${Database.#connectionCount}`);
    }
    
    disconnect() {
        if (this.#isConnected) {
            this.#isConnected = false;
            Database.#connectionCount--;
            console.log(`데이터베이스 연결 해제. 현재 연결 수: ${Database.#connectionCount}`);
        }
    }
    
    getStatus() {
        return {
            connected: this.#isConnected,
            totalConnections: Database.#connectionCount
        };
    }
    
    // static public 메서드
    static getInstance(connectionString) {
        if (!Database.#instance) {
            return new Database(connectionString);
        }
        return Database.#instance;
    }
    
    static getConnectionCount() {
        return Database.#connectionCount;
    }
}

const db1 = Database.getInstance('localhost:5432');
db1.connect();  // 데이터베이스 연결 성공. 현재 연결 수: 1

const db2 = Database.getInstance('localhost:5432');
console.log(db1 === db2);  // true - Singleton

console.log(Database.getConnectionCount());  // 1
console.log(db1.getStatus());  // { connected: true, totalConnections: 1 }

db1.disconnect();  // 데이터베이스 연결 해제. 현재 연결 수: 0
```

**설명:**
1. **static private**: `#instance`, `#connectionCount` - 클래스 전체에서 공유되는 비공개 데이터
2. **private**: `#connectionString`, `#isConnected`, `#validateConnection()` - 인스턴스별 비공개 데이터/메서드
3. **protected (관례)**: `_maxConnections` - 자식 클래스에서 접근 가능하도록 의도된 멤버
4. **public**: `connect()`, `disconnect()`, `getStatus()` - 외부에서 사용하는 인터페이스
5. **static public**: `getInstance()`, `getConnectionCount()` - 클래스 레벨의 공개 메서드

### 7. 접근 제어자 비교 표

| 접근 제어자 | 문법 | 클래스 내부 | 자식 클래스 | 외부 | 비고 |
|------------|------|-----------|-----------|-----|------|
| **public** | `name` | ✅ | ✅ | ✅ | 기본값, 키워드 불필요 |
| **private** | `#name` | ✅ | ❌ | ❌ | ES2022+, 진짜 비공개 |
| **protected** | `_name` | ✅ | ✅ | ✅ (권장X) | 관례일 뿐, 실제로는 public |
| **static** | `static name` | ✅ (클래스명으로) | ✅ (클래스명으로) | ✅ (클래스명으로) | 인스턴스 X |
| **static private** | `static #name` | ✅ (클래스명으로) | ❌ | ❌ | 클래스 전용 비공개 |

### 8. 실무 활용 가이드

**언제 무엇을 사용할까?**

1. **public**: 외부에서 자유롭게 사용해야 하는 모든 것 (기본값)
2. **private (`#`)**: 
   - 클래스의 내부 구현 세부사항
   - 외부에서 변경되면 안 되는 중요한 데이터
   - 예: 비밀번호, 계좌번호, 내부 상태
3. **protected (`_`)**: 
   - 자식 클래스에서 접근해야 하지만 외부에는 노출하고 싶지 않은 것
   - 단, 진짜로 막히지는 않으므로 주의
4. **static**: 
   - 유틸리티 함수 (Math.max, Array.from 같은)
   - 인스턴스 개수 추적
   - 팩토리 메서드
5. **static private**: 
   - Singleton 패턴의 인스턴스
   - 클래스 전체에서 공유되는 설정이나 캐시
   - 클래스 레벨의 비밀 정보

**코드블럭 7 - 종합 예제:**
```js
class PaymentSystem {
    static #processors = new Map();  // static private - 결제 프로세서 캐시
    static #transactionCount = 0;    // static private - 거래 횟수
    
    #userId;                         // private - 사용자 ID
    #balance;                        // private - 잔액
    _currency = 'KRW';               // protected - 통화 단위
    
    constructor(userId, initialBalance) {
        this.#userId = userId;
        this.#balance = initialBalance;
    }
    
    // private 메서드
    #log(message) {
        console.log(`[User ${this.#userId}] ${message}`);
    }
    
    #validateAmount(amount) {
        if (amount <= 0) throw new Error('금액은 0보다 커야 합니다.');
        if (amount > this.#balance) throw new Error('잔액이 부족합니다.');
        return true;
    }
    
    // public 메서드
    pay(amount, merchant) {
        this.#validateAmount(amount);
        this.#balance -= amount;
        PaymentSystem.#transactionCount++;
        this.#log(`${merchant}에 ${amount}${this._currency} 결제 완료`);
        return true;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    // static private 메서드
    static #registerProcessor(name, processor) {
        PaymentSystem.#processors.set(name, processor);
    }
    
    // static public 메서드
    static getTransactionCount() {
        return PaymentSystem.#transactionCount;
    }
    
    static initialize() {
        PaymentSystem.#registerProcessor('card', { type: 'card' });
        PaymentSystem.#registerProcessor('account', { type: 'account' });
        console.log('결제 시스템 초기화 완료');
    }
}

PaymentSystem.initialize();  // 결제 시스템 초기화 완료

const payment = new PaymentSystem('user123', 50000);
payment.pay(10000, '커피숍');  // [User user123] 커피숍에 10000KRW 결제 완료
console.log(payment.getBalance());  // 40000
console.log(PaymentSystem.getTransactionCount());  // 1
```

이제 JavaScript에서 접근 제어자를 완벽하게 이해하고 활용할 수 있다!
