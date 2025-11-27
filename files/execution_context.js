function fn(){
    let l1=1;
    var v1=2;
    function ifn(){
        return l1;
    }
    if(v1>1){
        let l2=3;
        var v2=4;
        console.log(this.x)
    }
    return ifn;
}
var y=fn.apply({x:10});

console.log(y()); //1


function fn() {
  let l1 = 1;
  var v1 = 2;
  function ifn() {
    return this?.x ?? 0 + l1;
  }
  if (v1 > 1) {
    let l2 = 3;
    var v2 = 4;
    console.log(v1, v2);
  }

  return ifn;
}

var xf = fn();
var y = xf.bind({ x: 10 });
let x = 1;
console.log(y(), x);