// mods/A.js
import { b } from "./B.js";
// import도 호이스팅이 된다 (import 선언은 모듈 본문보다 먼저 처리된다)
// 정정: 모듈 평가는 의존성부터 깊이 우선으로 끝낸다. A → B → C 순서로 따라 내려가고,
// C가 import하는 B는 이미 평가 중이라 건너뛰므로 실제 평가 순서는 C → B → A다.
// (각 모듈 첫 줄에 console.log를 넣어 node v24에서 확인: [C 평가] → [B 평가] → [A 평가])

import defC, { c } from "./C.js";
// 정정: C.js는 다시 실행되지 않는다. ESM은 같은 모듈을 한 번만 평가하고,
// 두 번째 import는 이미 평가된 같은 모듈 인스턴스의 바인딩을 가져온다.
// 출처: https://tc39.es/ecma262/#sec-innermoduleevaluation (상태가 evaluated·evaluating인 모듈은 다시 실행하지 않고 반환)
//       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_classic_scripts
// defC는 C.js의 디폴트 익스포트를 가리킨다
b();
c();
defC();
