네트워크 프로토콜

HTTP1

- 싱글 스레드

HTTP2

- 멀티 스레드

현재는 거의 대부분 2.0을 쓰는상황

http://www.domain.com:1234/path/to/resource?a=b&x=y

여기서 a=b와 같이 붙는것을 쿼리파라미터라고 한다
:id, [id] 와 같이 path param을 세그먼트라고 한다

GET은 2바이트이면 1024
4096 정도의 데이터밖에 전송할수 없다

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
4. Layout (Reflow ← cf. 브라우저 크기 변경) cf. display:absolute
   Render Tree에 크기(w/h, scrollXY), 좌표(위치) 등 결정
5. Paint (RePaint ← Reflow) cf. visibility
   텍스트, 색상, 굵기, 모서리(radius), 그림자 등
6. Composite  
   Layer 합성

1,2,3 번이 CPU를 많이 쓴다
물론 요즘에는 GPU도 쓰긴한다
4,5,6 번은 GPU를 쓴다
