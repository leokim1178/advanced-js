class Name{
    constructor(name){
        this.name = name; // 무한루프 발생
    }
    set name(nm){
        this.name = nm; // 무한루프 발생
    }
    get name(){
        return this.name; // 무한루프 발생
    }
}
let n = new Name("Alice"); // Stack Overflow
// RangeError: Maximum call stack size exceeded