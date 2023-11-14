const cfg = require('./config').pool;



async function getConnection() {
  return new Promise((resolve, reject) => {
    cfg.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        resolve(null);
      } else {
        resolve(connection);
      }
    });
  });
}

async function query(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(`FAILED: ${err}`);
        connection.release();
        reject(err);
      } else {
        connection.release();
        resolve(result);
      }
    });
  });
}



module.exports = {
  getConnection,
  query,
};
