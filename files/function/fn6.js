for (let i = 0; i < 5; i += 1) {
    setTimeout(() => console.log(i), 100);
  }

for (var i = 0; i < 5; i += 1) {   
    setTimeout(() => console.log(i), 100);
}


for (let i = 0; i < 5; i += 1) {
    setTimeout(console.log, 100, i)
  }

for (var i = 0; i < 5; i += 1) {   
    setTimeout(console.log, 100, i)
}