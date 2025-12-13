const head = document.head;
const body = document.body;
const divs = document.getElementsByTagName("div"); // iterator라는 것을 기억하자
console.log("🚀 head : ", head);
console.log("🚀 body : ", body);
console.log("🚀 divs : ", [...divs]);

body.append("Append Text"); // body 맨 끝에 텍스트 추가
const element = document.createElement("strong");
element.innerHTML = "<p><i>Italic Text</i></p>";

body.appendChild(element); // body의 첫 번째 자식을 맨 끝으로 이동

const yyy = document.getElementsByClassName("y");

console.log("🚀 yyy : ", yyy);
console.log("🚀 yyy 내용 : ", yyy[0].textContent);

const eles = body.children;
console.log("🍄 eles : ", eles);
for (const ele of eles) {
  console.log("🍄 ele : ", ele);
}
const nodes = body.childNodes;
console.log("🐕 nodes : ", nodes);

for (const node of nodes) {
  console.log("🐕 node : ", node);
}

// node와 element의 차이를 알아두자
// element는 node의 하위 개념이다
// element는 태그 요소만 포함하지만 node는 텍스트 노드 등도 포함한다

const yyyContent = yyy[0];
yyyContent.setAttribute("style", "color: blue; font-weight: bold;");

const xxxContent = document.getElementById("xx");
// id가 없으면 null
xxxContent.style.color = "red";
xxxContent.style.fontWeight = "900";
xxxContent.style.backgroundColor = "yellow";
// 이렇게 한줄을 다 먹는 태그를 블럭태그라고 한다
xxxContent.dataset.x = "x";
xxxContent.dataset.y = "y";
// data setting 방법
console.log("🚀 xxxContent : ", xxxContent);

// data getting 방법
console.log("🚀 data-x : ", xxxContent.dataset.x);
console.log("🚀 data-y : ", xxxContent.dataset.y);
console.log("🚀 data : ", xxxContent.dataset);
// 자료구조는 DOMStringMap, map이다
// 객체로 바꿔보자
console.log("🚀 data as object : ", { ...xxxContent.dataset });

// span같이 하나만 먹는 태그를 인라인태그라고 한다
const span1 = document.getElementById("sp");
span1.style.backgroundColor = "green";
document.getElementById("frm").addEventListener("submit", f);

function f(e) {
  e.preventDefault(); // submit 막기
  console.log("❤️ form action : ", e.target.action);
  console.log("❤️ event : ", e);
  console.log("❤️ form element : ", e.target);
}
function nm(input) {
  console.log("🍎 name event fired");
  console.log("🍎 input value : ", input.value);
  console.log("🍎 this : ", this);
}

function chg(input) {
  console.log("🍊 change event fired");
  console.log("🍊 input value : ", input.value);
  console.log("🍊 this : ", this);
}
