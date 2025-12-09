// 다음 코드에서 promiseAllSettled 함수를 직접 작성하시오.


const randTime = …

promiseAllSettled([randTime(11), Promise.reject('RRR'), randTime(33)])
 .then(array => {
   console.table(array);
   // console.log(JSON.stringify(array, null, '  '));
   console.log('여긴 과연 호출될까?!');
   assert.deepStrictEqual(array, allSettledResults);
 })
 .catch(error => {
   console.log('reject!!!!!!>>', error);
 });


 const allSettledResults = [
     {
       status: 'fulfilled',
       value: 11,
     },
     {
       status: 'rejected',
       reason: 'RRR',
     },
     {
       status: 'fulfilled',
       value: 33,
     },
   ];
