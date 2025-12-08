const assert = require("assert");

// 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.

const 초성목록 = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

function getInitialSound(char) {
  const code = char.charCodeAt(0);
  const 가 = "가".charCodeAt(0); // 0xAC00 = 44032
  const 힣 = "힣".charCodeAt(0); // 0xD7A3 = 55203

  // 한글 범위가 아니면 원래 문자 반환
  if (code < 가 || code > 힣) return char;

  // 초성 인덱스 계산
  const 초성인덱스 = Math.floor((code - 가) / 588);
  // 유니코드 = 0xAC00 + (초성 × 588) + (중성 × 28) + 종성

  return 초성목록[초성인덱스];
}

function searchByKoreanInitialSound(arr, initialSound) {
  const initialArr = arr
    .map((el) => {
      return {
        originStr: el,
        initial: [...el]
          .map((el2) => {
            return getInitialSound(el2);
          })
          .join(""),
      };
    })
    .filter((el3) => {
      const pattern = initialSound;
      const regex = new RegExp(pattern, "gi");
      return el3.initial.match(regex);
    })
    .map((el) => el.originStr);

  return initialArr;
}

s = ["강원도 고성군", "고성군 토성면", "토성면 북면", "북면", "김1수"];
searchByKoreanInitialSound(s, "ㄱㅅㄱ");
searchByKoreanInitialSound(s, "ㅌㅅㅁ");
searchByKoreanInitialSound(s, "ㅂㅁ");
searchByKoreanInitialSound(s, "ㅍㅁ");
searchByKoreanInitialSound(s, "ㄱ1ㅅ");

assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅇ"), [
  "강원도 고성군",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅅㄱ"), [
  "강원도 고성군",
  "고성군 토성면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅌㅅㅁ"), [
  "고성군 토성면",
  "토성면 북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅂㅁ"), [
  "토성면 북면",
  "북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅍㅁ"), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ1ㅅ"), ["김1수"]);
