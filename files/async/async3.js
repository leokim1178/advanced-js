// Promise 기반 비동기 처리 방식
Pool.connect().then((conn) => {
  return conn
    .query(sql1)
    .then((rows) => {
      util.log("rows length=", rows.length);
      return conn.query(sql2);
    })
    .then((rows2) => {
      util.log("rows2 length=", rows2.length);
    })
    .catch((err) => {
      util.log("Error:", err);
    })
    .finally(() => {
      conn.release();
    });
});
