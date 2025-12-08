
// console.log('i=',i); // undefined
let i=1; // -> let i = <not initialized yet> 
console.log('x=',x); // undefined
var x=1; // -> var x = undefined
// f(); // error: f is not a function
{
    f();
    var x=2;
    function f(){
        console.log('f called',x,xx);
    }
    const b=1;
}
function ff(){
    console.log('ff called',y,yy)
}
if(x>=2){
    var y=5;
    let yy=55;
}
var xx=100;
ff();