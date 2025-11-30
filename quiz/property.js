const arr = [100, 200, 300, 400, 500, 600, 700];

// 1. for-in문을 사용하여 배열의 인덱스(키)를 출력하시오.
// for(const key in arr){
//     console.log(key)
// }

// 2. for-in문을 사용하여 배열의 원소(값)를 출력하시오. (of)
// for(const key in arr ){
//     console.log(arr[key])
// }


const obj = { name: 'Kim', addr: 'Yongsan', level: 1, role: 9, receive: false }

// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
// console.log(Object.keys(obj))
// for( const i in Object.keys(obj)){
//     console.log(Object.keys(obj)[i])
// }
// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
// for( const i in Object.keys(obj)){
//     console.log(obj[Object.keys(obj)[i]])
// }
// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
// for(const value of Object.values(obj) ){
//     console.log(value)
// }
// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오. // Object.defineProperty
// Object.defineProperty(
//     obj,'level',{
// enumerable:false
//     }
// )
// console.log(obj)
// 7. role 프로퍼티는 읽기전용으로 설정하시오. // Object.defineProperty
// Object.defineProperty(
//     obj, 'role',{
//         writable:false
//     }
// )
// obj.role = 29
// console.log(obj)



data = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 
// 배열을 객체로 만드시오. (makeObjectFromArray)
// let makeObjectFromArray={}
// for(const [key,...value]of data){
//     console.log(key)
//     console.log(value)
//     makeObjectFromArray = Object.assign(makeObjectFromArray,{
//         [key]:value
//     })
// }
// console.log(makeObjectFromArray)


// => { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }


// 위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)
// let makeArrayFromObject = Object.entries(makeObjectFromArray)
// makeArrayFromObject= makeArrayFromObject.map(a=>a.flat())
// console.log(makeArrayFromObject)

// dataObj = { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }

// => [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]


// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를  사용하지 말고 작성하시오.


// // 1) shallow copy
const kim = {nid: 3, nm: 'Kim', addr: 'Pusan'};
function shallowCopy(obj){
    if(!obj || typeof obj !=='object'){
        return {}
    }

    const keys = Object.keys(obj)
    let result={}
    for(const key of keys){
        Object.assign(result,{
            [key]: obj[key]
        })
    }
    return result
}
const newKim1 = shallowCopy(kim);
newKim1.addr = 'Daegu';
console.log(newKim1)
console.log(kim.addr !== newKim1.addr); // true면 통과!
// // 2) 이하 deep copy
const kim2 = {nid: 3, nm: 'Kim', addr: {city: 'Pusan', road: 'Haeundaero', zip: null }};
function deepCopy(obj){
    if(!obj || typeof obj !=='object'){
        return {}
    }
    let result={}

    const keys = Object.keys(obj)

    for(const key of keys){
        Object.assign(result,{
            [key]: typeof obj[key] ==='object' ?deepCopy(obj[key]): obj[key]
        })
    }
    return result
}
const newKim2 = deepCopy(kim2); 
newKim2.addr.city = 'Daegu';
console.log(newKim2)
console.log(kim2.addr.city !== newKim2.addr.city); // true면 통과!