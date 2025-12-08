

const arr = [ [{id:1}],[{id:2},{id:3}]]
const [
    [ {id: id1} ],
    [ {id: id2}, {id: id3} ]
] = arr;
console.log(id1, id2, id3);  // 1 2 3

const user = {name:"Hong", passwd:'xyz',addr:"Seoul"};
function getValueExceptInitial(k) {
    const [,...result] = user[k]
    console.log(result.join(''));
    return result.join('');
}
getValueExceptInitial('name');  // ong
getValueExceptInitial('passwd');  // yz
getValueExceptInitial('addr');  // eoul