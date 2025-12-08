
// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를  사용하지 말고 작성하시오.


// 1) shallow copy
const kim = {nid: 3, nm: 'Kim', addr: 'Pusan'};
function shallowCopy(obj){
    if(!obj || typeof obj !=='object'){
        return {}
    }

    let result={}
    for(const [key, value] of Object.entries(obj)){
        Object.assign(result,{
            [key]: value
        })
    }
    return result
}
const newKim1 = shallowCopy(kim);
newKim1.addr = 'Daegu';
console.log(newKim1)
console.log(kim.addr !== newKim1.addr); // true면 통과!
// 2) 이하 deep copy
const kim2 = {nid: 3, nm: 'Kim', addr: {city: 'Pusan', road: 'Haeundaero', zip: null, detail: {
    floor: 10, room: 1004
}}};
function deepCopy(obj){
    if(!obj || typeof obj !=='object'){
        return {}
    }
    let result={}

    for(const [key, value] of Object.entries(obj)){
        Object.assign(result,{
            [key]: value !== null && typeof value ==='object' ?deepCopy(value): value
            // null의 typeof가 object이므로 별도 처리 필요
        })
    }
    return result
}
const newKim2 = deepCopy(kim2); 
newKim2.addr.city = 'Daegu';
newKim2.addr.detail.floor = 20;
console.log(kim2)
console.log(newKim2)
console.log(kim2.addr.city !== newKim2.addr.city); // true면 통과!