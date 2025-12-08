class Name{

    constructor(name){
        this._name = name; // 프라이빗 변수에 할당
    }
    set name(nm){
        this._name = nm; // 프라이빗 변수에 할당
    }
    get name(){
        return this._name; // 프라이빗 변수 반환
    }
}
let n = new Name("Alice");
console.log(n.name); // "Alice"
n.name = "Bob";
console.log(n.name); // "Bob"