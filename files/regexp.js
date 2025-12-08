const regexp = /senior|coding/gi;

if (regexp.test("Junior Developer")) console.log("OK");
if (regexp.test("Senior Developer")) console.log("OK"); // 인덱스 6까지 이동
if (regexp.test("JS Coding")) console.log("OK"); // 여기서도 인덱스 6부터 검사하기 떄문에 i부터 찾게 되는데 이렇게 되면 매칭이 안됨
if (regexp.test("JavaScript Coding")) console.log("OK"); // 인덱스 6부터 검사하여 r부터 다시 매칭 시작, 여기서는 coding이 매칭됨

// 해결 방법: regexp.lastIndex를 0으로 초기화
regexp.lastIndex = 0;
if (regexp.test("JS Coding")) console.log("OK"); // 이제 매칭이 됨

// 하나의 정규식으로 여러 문자열을 검사할 때는 한번 사용한 후에는 초기화를 해줘야한다

const regexp2 = /senior|coding/gi;
