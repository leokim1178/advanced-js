// ============================================
// replace vs replaceAll 기본 사용법
// ============================================
console.log("\n=== 1. replace vs replaceAll ===");
console.log("세종대왕".replace("왕", "황"));
// '세종대황' - replace는 첫 번째 매치만 교체

console.log("Senior Coding Learning JS".replace("o", "O"));
// 'SeniOr Coding Learning JS' - 첫 번째 'o'만 교체

console.log("Senior Coding Learning JS".replaceAll("o", "O"));
// 'SeniOr COding Learning JS' - 모든 'o'를 교체

console.log("Senior Coding Learning JS".replace(/o/g, "O"));
// 'SeniOr COding Learning JS' - 정규식 g 플래그로 모든 'o' 교체

// console.log("Senior Coding Learning JS".replaceAll(/o/, "O"));
// ❌ Error: 'non-global RegExp'
// replaceAll은 정규식 사용 시 반드시 g 플래그 필요

console.log("Senior Coding Learning JS".replace(/o/g, "O"));
// 'SeniOr COding Learning JS'

// ============================================
// 문자 클래스와 캡처 그룹 활용
// ============================================
console.log("\n=== 2. 문자 클래스 활용 ===");
console.log("Senior Coding Learning JS".replace(/[A-Z]/g, "#"));
// '#enior #oding #earning ##' - 모든 대문자를 #으로 교체

// ============================================
// 캡처 그룹 ($1, $2, ...)
// ============================================
console.log("\n=== 3. 캡처 그룹 활용 ===");
console.log("Senior Coding Learning JS".replace(/([A-Z]+)([a-z\s]*)/g, "$1-"));
// 'S-C-L-JS-'
// $1: 대문자 그룹, $2: 소문자+공백 그룹
// $2를 생략하면 대문자 뒤의 소문자/공백이 모두 사라짐

console.log(
  "Senior Coding Learning JS".replace(/([A-Z]+)([a-z\s]*)/g, "$1-$2")
);
// 'S-enior C-oding L-earning JS-'
// $1(대문자) + '-' + $2(소문자/공백) 형태로 교체

// ============================================
// $& (매치된 전체 문자열)
// ============================================
console.log("\n=== 4. $& 특수 변수 ===");
console.log("Senior Coding Learning JS".replace(/[A-Z]/g, "$&"));
// 'Senior Coding Learning JS' - 매치된 것을 그대로 유지 (의미 없음)
// $& = 매치된 전체 문자열 (모든 캡처 그룹 포함)

console.log("Senior Coding Learning JS".replace(/[A-Z]/g, "`$&`"));
// '`S`enior `C`oding `L`earning `J``S`'
// 매치된 각 대문자를 백틱으로 감싸기

// ============================================
// 실용 예제: 카드번호/주민번호 마스킹
// ============================================
console.log("\n=== 5. 실용 예제: 마스킹 ===");
console.log(
  "1234-2323-2323-2323".replace(/(\d{4})-(\d{4})-(.*)$/, "$1-####-$3")
);
// '1234-####-2323-2323'
// $1: 첫 4자리, $2: 두번째 4자리(####로 교체), $3: 나머지

// ============================================
// replace 콜백 함수
// ============================================
console.log("\n=== 6. 콜백 함수 활용 ===");
let str = "Senior Coding Learning JS";

// 기본 콜백: 대문자를 소문자로 변환
console.log(
  str.replace(/[A-Z]/g, (match, offset, original) => {
    console.log(
      `  - match: '${match}', offset: ${offset}, original: '${original}'`
    );
    return match.toLowerCase();
  })
);
// 콜백 함수 매개변수:
// - match: 매치된 문자열 (예: 'S', 'C', 'L', ...)
// - offset: 매치된 위치 (인덱스)
// - original: 원본 문자열 전체

// 고급 콜백: 캡처 그룹 활용
console.log("\n=== 7. 캡처 그룹 + 콜백 ===");
console.log(
  "Senior Coding Learning JS".replace(
    /([A-Z])([a-z]+)/g,
    (match, p1, p2, offset, original) => {
      console.log(
        `  - match: '${match}', p1: '${p1}', p2: '${p2}', offset: ${offset}`
      );
      return `[${p1}${p2.toUpperCase()}]`;
    }
  )
);
// '[SENIOR] [CODING] [LEARNING] JS'
// 콜백 매개변수 (캡처 그룹 있을 때):
// - match: 전체 매치
// - p1, p2, ...: 각 캡처 그룹 ($1, $2, ...)
// - offset: 매치 위치
// - original: 원본 문자열

// ============================================
// 추가 실용 예제
// ============================================
console.log("\n=== 8. 추가 실용 예제 ===");

// 전화번호 포맷팅
console.log("01012345678".replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
// '010-1234-5678'

// 이메일 도메인만 추출
console.log("user@example.com".replace(/.*@(.*)/, "$1"));
// 'example.com'

// 날짜 형식 변환 (YYYYMMDD → YYYY-MM-DD)
console.log("20231225".replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
// '2023-12-25'

// 카멜케이스를 케밥케이스로
console.log(
  "backgroundColor".replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
);
// 'background-color'

console.log("\n=== 완료 ===\n");
