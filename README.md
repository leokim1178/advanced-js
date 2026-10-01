# advanced-js
이 저장소는 인프런 강의 "@시코 - JavaScript 최고수되기 (개념과 실무)"를 수강하며 작성한 학습노트와 문제풀이 코드들을 포함하고 있습니다.

## 구성
- `memo/` 주제별 강의 노트 (basic·function·oop·builtin-objects·async·module·DOM·performance·string-regex)
- `files/` 강의를 따라 작성한 실습 코드
- `quiz/` 강의 문제 풀이

## 직접 실행해서 확인한 것
- [V8 메모리 표현 관찰](memo/basic/변수와%20상수.md): `node --allow-natives-syntax`의 `%DebugPrint`로 Smi·HeapNumber·String 래퍼 객체 출력을 찍어 봤다.
- [ESM 순환 import](files/module/A.js): B.js와 C.js가 서로 import하는 구조를 만들어 평가 순서를 봤다. 각 모듈은 한 번만 평가되고 순서는 C → B → A였다.
- [재귀 memoize의 스택 한계](files/closure/memoized_function3.js): 범용 `memoized()`로 팩토리얼을 감싸면 1000은 `Infinity`, 캐시 없이 바로 5000을 부르면 `RangeError`(콜 스택 초과)가 난다. memoize는 중복 계산을 없애도 재귀 깊이는 줄이지 못한다.

노트 중 틀린 서술은 2026-10에 출처와 함께 정정했고, 정정한 곳에 `2026-10 정정`을 표시했다.
