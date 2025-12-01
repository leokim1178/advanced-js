function f() {
    console.log('constructor:', f.constructor);
    console.log('f.name:', f.name);
    console.log('f.length:', f.length); // 매개변수의 개수 (디폴트 매개변수는 제외)
    console.log('arguments:', arguments); // 유사배열객체
    console.log('new.target:', new.target); // new 연산자와 함께 호출되었는지 확인
}
f(1,2,3);
//f.name: f
// f.length: 0
// arguments: [Arguments] { '0': 1, '1': 2, '2': 3 }
// new.target: undefined

new f(1,2,3);
 // f.name: f
// f.length: 0
// arguments: [Arguments] { '0': 1, '1': 2, '2': 3 }
// new.target: [Function: f]

// new.target은 생성자 함수로 호출되었는지 확인할 때 사용

const af = ()=>{
    console.log('af.name:', af.name);
    console.log('af.length:', af.length);
    console.log('arguments:', arguments); // 화살표 함수에는 arguments 객체가 없음
    console.log('new.target:', new.target); // 화살표 함수에는 new.target이 없음
}
// new af(1,2,3); 
// TypeError: af is not a constructor
// constructor가 없기 때문에 new 연산자와 함께 호출할 수 없음

af(1,2,3);

// node에서는 아래와 같이 찍힌다
// 이유는  arguments 객체와 new.target이 전역 객체에 바인딩 되기 때문

// af.name: af
// af.length: 0
// arguments: [Arguments] {
//   '0': {},
//   '1': [Function: require] {
//     resolve: [Function: resolve] { paths: [Function: paths] },
//     main: {
//       id: '.',
//       path: '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files',
//       exports: {},
//       filename: '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files/fn.js',
//       loaded: false,
//       children: [],
//       paths: [Array],
//       [Symbol(kIsMainSymbol)]: true,
//       [Symbol(kIsCachedByESMLoader)]: false,
//       [Symbol(kIsExecuting)]: true
//     },
//     extensions: [Object: null prototype] {
//       '.js': [Function (anonymous)],
//       '.json': [Function (anonymous)],
//       '.node': [Function (anonymous)],
//       '.mjs': [Function: loadESMFromCJS]
//     },
//     cache: [Object: null prototype] {
//       '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files/fn.js': [Object]
//     }
//   },
//   '2': {
//     id: '.',
//     path: '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files',
//     exports: {},
//     filename: '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files/fn.js',
//     loaded: false,
//     children: [],
//     paths: [
//       '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files/node_modules',
//       '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/node_modules',
//       '/Users/gimtaeyeong/Desktop/inflearn/js/node_modules',
//       '/Users/gimtaeyeong/Desktop/inflearn/node_modules',
//       '/Users/gimtaeyeong/Desktop/node_modules',
//       '/Users/gimtaeyeong/node_modules',
//       '/Users/node_modules',
//       '/node_modules'
//     ],
//     [Symbol(kIsMainSymbol)]: true,
//     [Symbol(kIsCachedByESMLoader)]: false,
//     [Symbol(kIsExecuting)]: true
//   },
//   '3': '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files/fn.js',
//   '4': '/Users/gimtaeyeong/Desktop/inflearn/js/advanced-js/files'
// }
// new.target: undefined