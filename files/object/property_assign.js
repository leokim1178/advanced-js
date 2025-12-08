const user = {
  id: 1,
  name: 'Hong',
};
console.log(Object.assign({x:100}, user)) ;


Object.assign(user,{
    getName() {
        return this.name;
    }
})
console.log(user.getName()); // 'Hong'

