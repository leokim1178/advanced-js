const arr = [undefined, null,false, 0,NaN,'     ','',[],+[]];
for(const value of arr) {
    console.log(value,`Boolean: ${!!value}`);
}


