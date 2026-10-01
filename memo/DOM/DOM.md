네트워크 프로토콜

HTTP1

- 싱글 스레드

HTTP2

- 멀티 스레드

(2026-10 정정) HTTP 버전은 스레드 모델을 정하지 않는다. HTTP/1.1은 연결 하나에서 요청을 순서대로 주고받고, HTTP/2는 연결 하나에서 여러 요청/응답 스트림을 동시에 보낸다(multiplexing). https://www.rfc-editor.org/rfc/rfc9113.html#section-1

현재는 거의 대부분 2.0을 쓰는상황

http://www.domain.com:1234/path/to/resource?a=b&x=y

여기서 a=b와 같이 붙는것을 쿼리파라미터라고 한다
:id, [id] 와 같이 path param을 세그먼트라고 한다

GET은 2바이트이면 1024
4096 정도의 데이터밖에 전송할수 없다
(2026-10 정정) HTTP 명세에는 URI 길이 상한이 없고, 최소 8000 octets 지원을 권고한다. 실제 상한은 브라우저·서버 구현값이다. https://www.rfc-editor.org/rfc/rfc9110.html#section-4.1

POST는 호출시 request에 용량 제한이 없다

그래서 파일을 보낼때에는 POST로 보내야한다

<br/>같이 동시에 닫아야 하는 상황이 있다

JSX는 JS에 XML이 붙은것

## DOM

1. Connect & Request to Server

- HTML, CSS, JS, Image, Fonts, etc

2. HTML/CSS Parsing ⇒ Token/Lexer ⇒ Node

- ⇒ DOM, CSSOM ⇒ Render(DOM/CSSOM) Tree

3. JS Parsing ⇒ AST(ByteCode) cf. V8, JSCore, SpiderMonkey
   ⇒ Run with Render Tree(DOM/CSSOM) cf. display:none
4. Layout (Reflow ← cf. 브라우저 크기 변경) cf. position:absolute (2026-10 정정: display에는 absolute 값이 없다)
   Render Tree에 크기(w/h, scrollXY), 좌표(위치) 등 결정
5. Paint (RePaint ← Reflow) cf. visibility
   텍스트, 색상, 굵기, 모서리(radius), 그림자 등
6. Composite  
   Layer 합성

1,2,3 번이 CPU를 많이 쓴다
물론 요즘에는 GPU도 쓰긴한다
4,5,6 번은 GPU를 쓴다
(2026-10 정정) Layout과 Paint 기록은 메인 스레드(CPU)에서 한다. GPU가 주로 쓰이는 건 래스터와 Composite다. https://developer.chrome.com/blog/inside-browser-part3

Node

- firstChild vs firstElementChild, lastChild vs lastElementChild
- childNodes<NodeList> vs children<HTMLCollection>,
- childElementCount, hasChildNodes()
- nextElementSibling, nextSibling, previousElementSibling, …
- nodeName, nodeValue, textContent, innerText, innerHTML. etc
  Element
- getElementById, getElementsByTagName, querySelector, (get|set|remove)Attribute,
- clientHeight, clientWidth, offsetHeight, offsetWidth, getAttribute, setAttribute
- style.color, style.backgroundColor, …, textContent, innerText, innerHTML. etc
  (2026-10 정정: innerHtml → innerHTML, getElementByTagName → getElementsByTagName. DOM 이름은 대소문자·철자가 정확해야 한다)
  문서 조작
- remove, appendChild(Element), append(Node|string), replaceChild, insertBefore,
- document.create\* : TextNode, Attribute, Element, Comment, etc
  Events
- blur, click, dblclick, copy, cut, keydown, keyup, keypress, mouseover, mouseleave, focus, focusin, focusout, touchstart, touchmove, touchend, wheel, etc
