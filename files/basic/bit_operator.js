let a = 0b1010; // 10진수 10
let b = 0o12;   // 10진수 10
let c = 0xA;    // 10진수 10
console.log(a&b); // 
console.log(a|b);
console.log(a^b);
console.log(~a);
console.log(a>>1); // 0b0101
console.log(a>>>1); // 0b0101
console.log(a<<1); // 0b10100


const R =1; W=2; E=4; // 0b001, 0b010, 0b100
let auth = parseInt('011',2); // 0b011 = 3
const hasWriteAUth= (auth & W) 
const hasExecuteAuth = (auth & E)
const hasReadAndExecuteAuth = (auth & (R|E))
console.log(hasWriteAUth); // 2 (true)
console.log(hasExecuteAuth); // 0 (false)
console.log(hasReadAndExecuteAuth); // 1 (false)
auth = auth ^ E; // 권한 추가