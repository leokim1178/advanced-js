const assert = require("assert");
// 자음으로 끝나는
const ALPHA_NUMERIC = [..."lmnrLMNR013678"].map((a) => a.charCodeAt(0));
const ㄱ = "ㄱ".charCodeAt();
const ㅎ = "ㅎ".charCodeAt();
const 가 = "가".charCodeAt();
const 힣 = "힣".charCodeAt();

const isEndJaum = (orgStr) => {
  const e = orgStr.charCodeAt(orgStr.length - 1);

  if (ALPHA_NUMERIC.includes(e)) return true;
  if (e >= ㄱ && e <= ㅎ) return true;
  // 자음으로 끝나면 기억,니은,디귿,...히읗이기 떄문에 자음으로 끝나는 것 true
  if (e >= 가 && e <= 힣 && (e - 가) % 28 !== 0) return true;
  return false;
};

// 문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
isEndJaum("강원도"); // false
isEndJaum("바라당"); // true
isEndJaum("ㅜㅜ"); // false
isEndJaum("케잌"); // true
isEndJaum("점수 A"); // false lmnr   cf. isEndJaum('알파벳L')은 true
isEndJaum("24"); // false   cf. isEndJaum('23')은 true 136780

const josa = (str, jaum, moum) => {
  if (jaum && moum) {
    return isEndJaum(str) ? jaum : moum;
  }
};
const iga = (str) => josa(str, "이", "가");
const eunun = (str) => josa(str, "은", "는");
const eulul = (str) => josa(str, "을", "를");
const eyuya = (str) => josa(str, "이어야", "여야");

// 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
// 이/가는 자음으로 끝나면 '이', 모음으로 끝나면 '가'
// 은/는은 자음으로 끝나면 '은', 모음으로 끝나면 '는'
// 을/를는 자음으로 끝나면 '을', 모음으로 끝나면 '를'

`고성군${iga("고성군")}`; // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
`고성군${eunun("고성군")}`; // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
`고성군${eulul("고성군")}`; // 고성군을  cf. `강원도${eulul('강원도')}` ⇒ 강원도를
// (추가) ~이어야/여야, ~이랑/랑           isEndJaum('북면') ?  '이' : '가')

assert.equal(isEndJaum("아지오"), false);
assert.equal(isEndJaum("북한강"), true);
assert.equal(isEndJaum("뷁"), true);
assert.equal(isEndJaum("강원도"), false);
assert.equal(isEndJaum("바라당"), true);
assert.equal(isEndJaum("ㅜㅜ"), false);
assert.equal(isEndJaum("케잌"), true);
assert.equal(isEndJaum("점수 A"), false);
assert.equal(isEndJaum("알파벳L"), true);
assert.equal(isEndJaum("24"), false);
assert.equal(isEndJaum("23"), true);
assert.equal(`고성군${iga("고성군")}`, "고성군이");
assert.equal(`고성군${eunun("고성군")}`, "고성군은");
assert.equal(`고성군${eulul("고성군")}`, "고성군을");
assert.equal(`성동구${iga("성동구")}`, "성동구가");
assert.equal(`성동구${eunun("성동구")}`, "성동구는");
assert.equal(`성동구${eulul("성동구")}`, "성동구를");
assert.equal(`고성군${eyuya("고성군")}`, "고성군이어야");
assert.equal(`성동구${eyuya("성동구")}`, "성동구여야");
