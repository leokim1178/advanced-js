const assert = require( "node:assert" )

// 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users = [kim, lee, park]; // 오염되면 안됨!!

users.addUser = user=> [...users,user]

users.addUser(hong);            // [kim, lee, park, hong]
// Array.prototype 조작 금지
// return

users.removeUser = user => users.filter((u)=>u.id !==user.id)
users.removeUser(lee);          // [kim, park]

users.changeUser = (user1,user2) => users.map(u=> u.id===user1.id? user2:u)

users.changeUser(kim, choi);   // [choi, lee, park]
const funcNames =Object.keys(users).filter(isNaN)

funcNames.forEach(funcName=>Object.defineProperty(users,funcName,{
    enumerable:false
}))




assert.deepStrictEqual(users.addUser(hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);
assert.deepStrictEqual(users.removeUser(lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);
assert.deepStrictEqual(users.changeUser(kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users, [kim, lee, park]);
