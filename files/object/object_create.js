obj = Object.create({id:1, f:function() {}});
console.log(obj);// {}
proto=obj.__proto__;
console.log(proto); // { id: 1, f: [Function: f] }
