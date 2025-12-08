


function makeArray(n, arr = []) {
    if (n === 0) return arr.reverse();
    arr = [...arr, n];
    return makeArray(n - 1, arr);
}

const result = makeArray(10)
console.log(result);

function makeReverseArray(n, arr = []) {
    if (n === 0) return arr;
    arr = [...arr, n];
    return makeReverseArray(n - 1, arr);
}
const result2 = makeReverseArray(5);
console.log(result2);