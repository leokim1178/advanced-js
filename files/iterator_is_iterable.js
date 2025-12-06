function isIterable(instance){
    return typeof instance[Symbol.iterator] === 'function';
}
console.log(isIterable([1,2,3])); // true
function isIterable2(instance){
    return Symbol.iterator in instance && 'next' in instance[Symbol.iterator]();
}
console.log(isIterable2([1,2,3])); // true

function isIterable3(instance){
    
}