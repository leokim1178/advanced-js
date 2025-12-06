class IterableObj{
    [Symbol.iterator](){
        return this.name.split(',').values();
    }
}

const obj = new IterableObj();
obj.name = 'apple,banana,cherry';

for(const item of obj){
    console.log('🚀 item : ',item)
}