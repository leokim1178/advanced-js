const arr = [1, 2, 3];

let node;
for (let i = arr.length - 1; i >= 0; i--) {
  node = { value: arr[i], rest: node };
  console.log(`🚀 ${i}: `, node);
}
console.log('🚀 node : ', node);


const arrToList =[];

while(true){
    arrToList.push(node.value);
    node = node?.rest;
    if(!node) break;
}
console.log('🚀 arrToList : ', arrToList);