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