
data = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 
// 배열을 객체로 만드시오. (makeObjectFromArray)
let makeObjectFromArray={}
for(const [key,...value]of data){
    console.log(key)
    console.log(value)
    makeObjectFromArray = Object.assign(makeObjectFromArray,{
        [key]:value
    })
}
console.log(makeObjectFromArray)


// => { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }


// 위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)

const makeArrayFromObject= Object.entries(makeObjectFromArray).map(a=>a.flat())
console.log(makeArrayFromObject)

dataObj = { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }

// => [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]

