// mods/A.js
import { b } from "./B.js";
// import도 호이스팅이 된다
// B.js가 한번 실행이 되며 C.js가 최초 실행

import defC, { c } from "./C.js";
// C.js가 한번 더 실행된다
// defC는 C.js의 디폴트 익스포트를 가리킨다
b();
c();
defC();
