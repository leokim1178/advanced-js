const sampleUrl = "https://jsonplaceholder.typicode.com/users/1";
const myFetch = (url) => fetch(url).then((res) => res.json());

// myFetch를 이용하는 코드
myFetch(sampleUrl).then((user) => {
  console.log("user>>>", user);
});

const waited = await myFetch(sampleUrl);
console.log(waited);
