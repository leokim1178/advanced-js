const regexp = /senior|coding/gi;

if (regexp.test("Junior Developer")) console.log("OK");
if (regexp.test("Senior Developer")) console.log("OK"); // 인덱스 6까지 이동
if (regexp.test("JS Coding")) console.log("OK"); // 여기서도 인덱스 6부터 검사하기 떄문에 i부터 찾게 되는데 이렇게 되면 매칭이 안됨
if (regexp.test("JavaScript Coding")) console.log("OK"); // (2026-10 정정) 바로 위 test가 실패하면서 lastIndex가 0으로 초기화됐다 → 처음부터 검사해 Coding이 매칭됨 (이후 lastIndex 17)
// 출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag

// 해결 방법: regexp.lastIndex를 0으로 초기화
regexp.lastIndex = 0;
if (regexp.test("JS Coding")) console.log("OK"); // 이제 매칭이 됨

// 하나의 정규식으로 여러 문자열을 검사할 때는 한번 사용한 후에는 초기화를 해줘야한다

const regexp2 = /senior|coding/gi;
