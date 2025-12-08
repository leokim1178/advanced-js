// 전화번호, URL, 이메일, 고유번호(sno) validation 체크
console.log(/^\d{2,3}-\d{3,4}-\d{4}$/.test("02-2345-2323")); // true
console.log(/^\d{3}-\d{3,4}-\d{4}$/.test("010-2345-2323")); // true
console.log(/^\d{2,4}-\d{3,4}-\d{4}$/.test("1577-2323")); // false!!
console.log(/^\d{2,4}-\d{3,4}(-\d{4})?$/.test("1577-2323")); //  true
// 괄호를 쓰고 물음표(?)를 붙이면 앞의 그룹이 0 또는 1개임을 의미
console.log(/^http(s?):\/\/.*\..*$/.test("http://topician.com")); // true
console.log(/^http(s?):\/\/.*\..*$/.test("htt://topician.com")); // false
console.log(/^http(s?):\/\/.*\..*$/.test("http://www.topician.com")); // true
console.log(/^http(s?):\/\/.*\..*$/.test("https://topician")); // false
// ex) 정확한 이메일 형식을 지켰는지 체크하는 정규표현식을 작성하시오.
const regex = /^[A-Za-z0-9][\w-\.]*@[\w-]+(\.[A-z]{2,7}){1,2}$/; // 2f_d.f@a.company
// 풀이 : 첫 글자는 [A-Za-z0-9] 영문대소문자 또는 숫자 ex) j, J, 0, 9
// 그 다음부터는 [\w-\.]* 영문자, 숫자, 밑줄, 하이픈, 점이 0개 이상 ex) jade123, ja_de.j-u-n
// @ 문자
// 그 다음은 [\w-]+ 영문자, 숫자, 밑줄, 하이픈이 1개 이상 ex) topician, jeon-topician
// 그 다음은 (\.[A-z]{2,7}){1,2} 점(.)과 영문자 2~7글자가 한번 혹은 두번 반복 가능 ex) .com, .co.kr
regex.test("jade123@topician.com"); // true
regex.test("jade123@topician.store"); // true
regex.test("jade123@topician"); // false
regex.test("ja_de.j-u-n@topician.store"); // true
regex.test("jade@jeon@topician.store"); // false
