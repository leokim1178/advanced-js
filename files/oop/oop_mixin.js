class Pet {
  feed(nutrient) {
    console.log(`feed to ${this.name} :`, nutrient);
  }
} 
// class Dog extends Animal, Pet {} // 불가!!

class Animal {
    constructor(name) {
        this.name = name;
    }
    bark() {
        console.log(`${this.name} : woof! woof!`);
    }
}


// class Pet extends Animal { }// 맞지 않음 (: Pet Plant도 있으니…)
// class Animal extends Pet { }// 맞지 않음 (:모든 동물이 애완은 아니니…)
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}   

const jake = new Dog('jake');
// jake.feed('dog-food'); // 이걸 가능하게 하려면?

// 1. __proto__ 직접 수정
// 이 방법이면 Animal의 기능을 잃기 때문에 나쁜 케이스이다
// jake.__proto__ = Pet.prototype; 
// jake.bark(); // bark가 불가능해진다

// 2. mixin 함수 작성 & Object.assign 활용
const petMixin= {
    likesPeople(){
        console.log(`${this.name} likes people!`);
    }
}
// 2-1 jake에게 petMixin 기능 추가
// Object.assign(Dog.prototype, petMixin);
// jake.likesPeople();
// jake.feed('dog-food'); // 그런데 이렇게 해도 feed는 안됨

// 2-2 Dog.prototype에 Pet의 기능을 추가
Object.assign(Dog.prototype, petMixin);
jake.likesPeople();
// 이렇게 jake의 prototype인 Dog.prototype에 Pet의 기능을 복사해 넣는 방식으로 mixin을 구현할 수 있다

// jake.feed('dog-food'); // 이렇게 해도 안된다
// jake는 Dog의 인스턴스이므로 Dog.prototype에 Pet.prototype의 메서드를 복사해 넣어야 한다

// mixin 함수 작성 
// Object.assign은 enumerable 속성만 복사하는데, 클래스 메서드는 non-enumerable이다
// 따라서 Object.getOwnPropertyDescriptors를 사용해야 한다
function mixin(target, ...sources){
    for (const source of sources) {
        // 모든 속성(enumerable이 아닌 것도 포함)을 복사
        const descriptors = Object.getOwnPropertyDescriptors(source);
        Object.defineProperties(target, descriptors);
    }
}

console.log('\n=== 왜 Object.assign이 안 되는가? ===');
console.log('Pet.prototype.feed enumerable?', 
    Object.getOwnPropertyDescriptor(Pet.prototype, 'feed').enumerable); // false

// 2-3 mixin 함수 활용 - Pet.prototype의 메서드를 Dog.prototype에 복사
mixin(Dog.prototype, Pet.prototype);

jake.feed('dog-food'); // feed to jake : dog-food - 성공!
jake.bark(); // jake : woof! woof! - Animal의 기능도 유지됨!

console.log('\n=== Mixin 방법들 ===\n');

// ========================================
// 방법 3: 여러 클래스를 순차적으로 mixin
// ========================================
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
}

const kitty = new Cat('kitty');

// 여러 mixin을 한 번에 적용 - Object.assign은 enumerable 속성만 복사하므로 클래스 메서드는 복사 안됨
// 대신 개선된 mixin 함수 사용
mixin(Cat.prototype, Pet.prototype, petMixin);
kitty.feed('cat-food');     // feed to kitty : cat-food
kitty.likesPeople();        // kitty likes people!
kitty.bark();               // kitty : woof! woof!

console.log('\n=== 방법 4: Subclass Factory Pattern (고급) ===\n');

// ========================================
// 방법 4: Subclass Factory Pattern
// - 함수형으로 mixin을 구현하는 현대적인 방법
// - 여러 mixin을 체이닝할 수 있음
// ========================================

// Mixin을 함수로 정의
const PetMixin = (SuperClass) => class extends SuperClass {
    feed(nutrient) {
        console.log(`feed to ${this.name} :`, nutrient);
    }
    likesPeople() {
        console.log(`${this.name} likes people!`);
    }
};

const PlayableMixin = (SuperClass) => class extends SuperClass {
    play(toy) {
        console.log(`${this.name} plays with ${toy}!`);
    }
};

// Mixin을 체이닝하여 새로운 클래스 생성
class Rabbit extends PlayableMixin(PetMixin(Animal)) {
    constructor(name) {
        super(name);
    }
    hop() {
        console.log(`${this.name} hops around!`);
    }
}

const bunny = new Rabbit('bunny');
bunny.bark();           // bunny : woof! woof! - Animal
bunny.feed('carrot');   // feed to bunny : carrot - PetMixin
bunny.likesPeople();    // bunny likes people! - PetMixin
bunny.play('ball');     // bunny plays with ball! - PlayableMixin
bunny.hop();            // bunny hops around! - Rabbit

console.log('\n=== 방법 5: Symbol을 사용한 Mixin (충돌 방지) ===\n');

// ========================================
// 방법 5: Symbol을 사용하여 메서드명 충돌 방지
// ========================================

const feedSymbol = Symbol('feed');
const SafePetMixin = {
    [feedSymbol](nutrient) {
        console.log(`[Safe] feed to ${this.name} :`, nutrient);
    }
};

class Bird extends Animal {
    constructor(name) {
        super(name);
    }
}

Object.assign(Bird.prototype, SafePetMixin);

const tweety = new Bird('tweety');
tweety[feedSymbol]('seeds');  // [Safe] feed to tweety : seeds
tweety.bark();                 // tweety : woof! woof!

console.log('\n=== 방법 6: Trait Pattern - 상속처럼 사용하는 Mixin ===\n');


// Trait 패턴을 위한 믹싱 함수 - 클래스를 반환
function mix(...mixins) {
    // 기본 클래스 생성
    class Mixed {
        constructor(...args) {
            // 각 mixin의 생성자 호출 (있다면)
            mixins.forEach(mixin => {
                if (mixin.prototype && mixin.prototype.constructor) {
                    // mixin이 클래스인 경우
                    const instance = new mixin(...args);
                    // 인스턴스 속성 복사
                    Object.assign(this, instance);
                }
            });
        }
    }
    
    // 각 mixin의 메서드를 Mixed의 prototype에 복사
    mixins.forEach(mixin => {
        if (mixin.prototype) {
            // 클래스인 경우 prototype의 모든 속성 복사
            const descriptors = Object.getOwnPropertyDescriptors(mixin.prototype);
            Object.defineProperties(Mixed.prototype, descriptors);
        } else {
            // 일반 객체인 경우 그대로 복사
            Object.assign(Mixed.prototype, mixin);
        }
    });
    
    return Mixed;
}

// 또 다른 trait - Reptile
class Reptile {
    constructor(name) {
        this.coldBlooded = true;
    }
    
    regulateTemperature() {
        console.log(`${this.name} is basking in the sun to regulate temperature.`);
    }
    
    shedSkin() {
        console.log(`${this.name} is shedding its skin.`);
    }
}

// Trait Pattern 사용: Animal과 Pet을 모두 상속받은 것처럼 동작
class Lizard extends mix(Animal, Pet, Reptile) {
    constructor(name, species) {
        super(name);
        this.species = species;
    }
    
    climb() {
        console.log(`${this.name} the ${this.species} is climbing the wall!`);
    }
}

const gecko = new Lizard('Gecko', 'Leopard Gecko');
console.log('gecko 인스턴스 생성:', gecko.name, '/', gecko.species);
console.log('gecko.coldBlooded:', gecko.coldBlooded);

// Animal의 메서드
gecko.bark(); // Gecko : woof! woof!

// Pet의 메서드
gecko.feed('insects'); // feed to Gecko : insects

// Reptile의 메서드
gecko.regulateTemperature(); // Gecko is basking in the sun to regulate temperature.
gecko.shedSkin(); // Gecko is shedding its skin.

// Lizard의 고유 메서드
gecko.climb(); // Gecko the Leopard Gecko is climbing the wall!



console.log('\n=== 프로토타입 체인 확인 ===\n');

console.log('jake instanceof Dog:', jake instanceof Dog);           // true
console.log('jake instanceof Animal:', jake instanceof Animal);     // true
console.log('jake instanceof Pet:', jake instanceof Pet);           // false - mixin은 상속이 아님!

console.log('\ngecko instanceof Lizard:', gecko instanceof Lizard);     // true
console.log('gecko instanceof Animal:', gecko instanceof Animal);       // false - trait도 진짜 상속은 아님!
console.log('gecko instanceof Pet:', gecko instanceof Pet);             // false
console.log('gecko instanceof Reptile:', gecko instanceof Reptile);     // false

console.log('\njake의 프로토타입 체인:');
console.log('jake.__proto__ === Dog.prototype:', jake.__proto__ === Dog.prototype);                          // true
console.log('Dog.prototype.__proto__ === Animal.prototype:', Dog.prototype.__proto__ === Animal.prototype);  // true

console.log('\ngecko의 프로토타입 체인:');
console.log('gecko.__proto__ === Lizard.prototype:', gecko.__proto__ === Lizard.prototype);  // true
console.log('Lizard.prototype.__proto__:', Lizard.prototype.__proto__.constructor.name);     // Mixed