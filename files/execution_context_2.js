var gg = 1;  let bb = 2;
function f1(x,y) {  // cf. const f1 = function(x,y) { …
    // x,y는 f1EnvRec
  var gg = 11;   let bb = 22;
  console.log('f1>', gg, bb, zz, f2, f2.length); // 3 f2inner2
  f2('first'); // t,u,v 실행 (이 시점에 nested f2는 hoisting됐지만 <f.o>로 정의되지 않은 상태!) ← inner2
  { 
    const xx = 99; // f1 평가 시 xx는 notInitializedYet(uninitialized) 상태로 block상단에 hoisting.
    f2('nest-first'); 
    var zz = 88;   // f1 평가 시 f1 상단에 undefined로 hoisting.
    function f2(t) { console.log(t, 'nested', xx, zz
        // , ll // ll을 넣으면 ReferenceError
    ); }  // hoisting은 undefined로?! // 평가 당시에 호이스팅됨
    let lll = 0;   // hoisting되는 이유는 뒤에서 선언했는지 여부를 개발자에게 알려줘야 중복 선언 안함!
  }  // 평가시점에 f1 scope로 hoisting.
  function f2(t, u) { console.log(t, 'inner', xx, zz); }  // f1 평가 시 f1 상단에 <f.o>로 hoisting
  function f2(t, u, v) { console.log(t, 'inner2', xx, zz); } // hoisting 시, 위 라인의 f2를 덮어씀!(optimaizor가 덮어쓰는 것!)
  var zz = 800;
  f2('second');  // call 'nested'(파랑) & f2는 block을 가리킨다!
}
function f2(g) {
  console.log(g, 'global f2>', gg, bb, xx, kk); // ?
}
let xx = 9;
if (gg > 0) { var kk = 33; const yy = 9; }
f1(1,2);   
console.log(kk);  // ? yy is not defined in global scope
f2('third');  // global f2 실행

// 순서
// f1 ExeContext 생성 : f1의 첫번째 출력 : f1> 11 22 undefined [Function: f2] 3
// 여기서 f2는 inner2 f2를 가리킨다
// f1.f2 FunctionExeContext : f2 inner2가 호이스팅 되면서 두번째 출력 : first inner2 9 undefined
// f2 nested가 호이스팅되면서 f1.f2를 덮어씀 
// f1.f2 FunctionExeContext 소멸
// f1.Block.f2 FunctionExeContext : f2 nested가 호이스팅 되면서 세번째 출력 : nest-first nested 99 undefined
// Block이 끝났으므로 f1.Block.f2 FunctionExeContext 소멸되어야 하지만, functionDeclaration에서 f1.f2가 가리키고 있으므로 소멸되지 않음.
// f1.f2 FunctionExeContext : 소멸되지 않은 f1.f2가 가리키는 f2 nested가 호출되면서 네번째 출력 : second nested 99 800
// f1.f2 FunctionExeContext 소멸
// f1 ExeContext 소멸
// f1의 생명주기가 끝났으므로 f1 내의 f2는 더이상 참조되지 않아 소멸
// kk는 global ExeContext에 var로 선언되었기 때문에 다섯번째 출력 : 33
// f2 FunctionExeContext : global f2가 호출되면서 여섯번째 출력 : third global f2> 1 2 9 33


