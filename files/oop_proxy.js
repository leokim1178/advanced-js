const proxyObj = new Proxy(hong, {
  get(target, // 전달받은 객체
     prop, // 뭘 읽어왔는지
      receiver // binded object
    ) {  
    console.log('proxy.get>>', target, prop);
    if (prop === 'fullName') {
       return `${target.firstName} ${target.lastName}`;
    } else {
      return target[prop]?.toUpperCase();
    } // return Reflect.get(target, prop, receiver);
  },


  set(target, prop, value, receiver) {
    console.log('proxy.set>>', target, prop, value);
    if (prop === 'fullName') {
      const [f, l] = value.split(' ');
      target.firstName = f;
      target.lastName = l;
    } else { target[prop] = value; }   // target[prop]이 함수라면??
      // return Reflect.set(target, prop, value, receiver);
    return target;
  },
});

proxyObj.fullName = 'Nanda Kim';
console.log('proxy>>', proxyObj.fullName);
console.log('proxy>>', proxyObj);
console.log('instance>>', proxyObj instanceof Emp);