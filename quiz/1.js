for(let i=0.1; i<1; i=i+0.1){
    console.log(Number(i.toFixed(1)));
}

for(let i=1;i<=10;i++){
    const num = Math.sqrt(i) 
    if(num % 1 !== 0)
    console.log(`sqrt(${i}) = ${num.toFixed(3)}`);
}

const today = new Date();
const WEEK_NAMES="일월화수목금토";


console.log(WEEK_NAMES.charAt(today.getDay())+"요일");

function addPoints(a,b){
    let fixLength = Math.max(
        a.toString().split(".")[1]?.length || 0,
        b.toString().split(".")[1]?.length || 0
    );
    let result = (a + b).toFixed(fixLength);
    if(result.endsWith("0")){
        result = parseFloat(result).toString();
    }
    console.log(`${a} + ${b} = ${result}`);
    return result;
}
addPoints(0.21354, 0.1);
addPoints(10.34,200.226)
addPoints(0.14,0.28)
addPoints(0.001,0.009)


function addPointsBetter(a,b){
    const p = 10 **15;
    const ai = a * p;
    const bi = b * p;
    let result = Math.trunc((ai + bi)) / p; // Math.trunc 소수점 이하 버림

    console.log(result)
    console.log(a + " + " + b + " = " + result);

    return result;
}

addPointsBetter(0.21354, 0.1);
addPointsBetter(10.34,200.226)
addPointsBetter(0.14,0.28)
addPointsBetter(0.001,0.009)

function addPointsBest(...args){
    p= 10 ** 15;
    let result=0;
    for(const n of args){
        result +=  Math.trunc(n * p);

    }
    result = result / p;
    console.log("final result: ", result);
    return result;

}
addPointsBest(0.21354, 0.1,0.2);
addPointsBest(10.34,200.226);