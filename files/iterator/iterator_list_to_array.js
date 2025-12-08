
const arr = [1, 2, 3];

let list;
let preNode;
for (let i = 0; i < arr.length; i++) {
  const curNode = {value:arr[i], rest:undefined};
  if(!list){
    list = curNode;
  }else{
    preNode.rest = curNode; 
  }
    preNode = curNode;
    console.log(`🚀 ${i}: `, list);
}
console.log('🚀 list : ', list);



const arrToList =[];

while(true){
    arrToList.push(list.value);
    list = list?.rest;
    if(!list) break;
}
console.log('🚀 arrToList : ', arrToList);