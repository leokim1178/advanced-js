// 전통적 비동기 Callback 방식

// error-first callback pattern
Pool.connect((errConn, conn) => {
  conn.query(sql1, (err1, rows) => {
    util.log("rows length=", rows.length);

    conn.query(sql2, (err2, rows2) => {
      util.log("rows2 length=", rows2.length);
    });
  });
});
