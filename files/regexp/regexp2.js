var s = "강원도 고성군 토성면";

console.log(s.match(/성/)); // [ '성', index: 5, input: '강원도 고성군 토성면', groups: undefined ]
console.log(s.match(/성/g)); // [ '성', '성' ]
console.log(s.match(/.../g)); // [ '강원도', ' 고성', '군 토' ]
console.log(s.match(/\S\S\S/g)); // [ '강원도', '고성군', '토성면' ]  ⇐⇒ /\S{1,3}/g, /\S{3}/g
console.log(s.match(/도|고|리/g)); // [ '도', '고' ]   ⇐⇒ s.match(/[도고리]/g);
console.log(s.match(/성군/g)); // [ '성군' ]  cf. s.search(/성군/g); ⇐ 5, s.search(/도/g); ⇐ 2
console.log(s.match(/성(군|면)/g)); // [ '성군', '성면' ]    ⇐⇒ s.match(/성[군면]/g);
console.log(s.match(/.성(군|면)/g)); // [ '고성군', '토성면' ]  ⇐⇒ /..(군|면)/g, /..?(군|면)/g
s = "강원도  고성군 토성면 북면";
console.log(s.match(/.성(군|면)/g)); // [ '고성군', '토성면' ]
console.log(s.match(/..?(군|면)/g)); // [ '고성군', '토성면', ' 북면' ] // .? 는 0 또는 1개
console.log(s.match(/..{0,1}(군|면)/g)); // [ '고성군', '토성면', ' 북면' ]
console.log(s.match(/\S.?(군|면)/g)); // [ '고성군', '토성면', '북면' ]   ⇐⇒ s.match(/\S.{0,1}(군|면)/g)
console.log(s.match(/\S.*(군|면)/g)); // [ '강원도 고성군 토성면 북면' ] -> *는 0개 이상 (최대한도 없음)
console.log(s.match(/[가-기]/g)); // [ '강', '고', '군' ]   cf. '영나수ㄴㅃㅅㄲ'.match(/[ㄴ나-닣]/g) => [ '나' , 'ㄴ' ]
console.log(s.match(/[가-기]\S/g)); // [ '강원', '고성' ]  cf. '영강수ㄴㅃㅅㄲ'.match(/[ㄱㄲ가-깋]/g) => [ '강' , 'ㄲ' ]
