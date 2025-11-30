
const user = {
  '': 1,        
  ' ': 1,       // 'id': 1, '0y': 2 모두 OK!
  123: 1,       // user[123], user['123'] OK, but user.123 is SyntaxError!!
  12345n: 2,    // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1,      // OK  user[true]  user.true
  id: 2,          
  [`name`]: 'Hong',  // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: 'Hong',   // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365,    // OK! 'Sun Jul …': 365
  'my-friends': ['Han', 'Kim'],
  getInfo: () => `${this.id}-${this.name}`,       // OK! But, this is not user!
  getInfo() { return `${this.id}-${this.name}`; }, // OK! getInfo의 최종 <f.o>
} 

const propertyDescription = Object.getOwnPropertyDescriptor(user, 'id');
console.log(propertyDescription);
// const propertyDescriptions = Object.getOwnPropertyDescriptors(user);

user.id = 3;
Object.defineProperty(user, 'id', {
    writable: false,
})
user.id=4; // 무시됨
const propertyDescription2 = Object.getOwnPropertyDescriptor(user, 'id');
console.log(propertyDescription2);

Object.defineProperty(user, 'id', {
    enumerable: false,
    configurable: false,
});
for (const key in user) {
    console.log(key);  // id는 출력 안됨
}
console.log(Object.getOwnPropertyNames(user)); // id는 출력됨
Object.defineProperty(user, 'id', {
    writable: true,
}); // TypeError: Cannot redefine property: id  

Object.preventExtensions(user); // 추가, 삭제, 읽기, 쓰기, 재정의
Object.seal(user);              // 추가, 삭제, 읽기, 쓰기, 재정의(밀봉, writable:true인 것은 변경 가능)
Object.freeze(user);            // 추가, 삭제, 읽기, 쓰기, 재정의 (enumerable외 모두 false)