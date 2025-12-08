
class Animal {

  id = 1;       // member property
  #age = 10;    // private member variable
  constructor(name) { // constructor
    this.name = name; // member property
  }
  getAge() {  // Override the Object's toString()
    return this.#age;
  }

  toString() {  // Override the Object's toString(), [메소드] 다형성!
    return `This animal's name is ${this.name}.`;
  }
} 

let dog = new Animal('Dog');
console.log(dog.toString()); // This animal's name is Dog.
