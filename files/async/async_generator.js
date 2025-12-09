function* pAfterTime(sec) {
  return yield afterTime(sec);
}

async function* asyncAfterTime(sec) {
  return await afterTime(sec);
}

const pat = pAfterTime(1);
console.log("promise>>", pat.next());

const aat = asyncAfterTime(1);
console.log("async>>", await aat.next());
