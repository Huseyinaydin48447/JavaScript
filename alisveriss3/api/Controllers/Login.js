const express = require('express');
const router = express.Router();
const { getConnection, query } = require('../../db');

router.post("/", async (req, res) => {
    //console.log("came to login function")
  try {
    const connection = await getConnection();

    if (connection) {
      const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
      const result = await query(connection, sql, [req.body.kullaniciAdi, req.body.password]);

      if (result.length > 0) {
        // create a token and insert into admin token data
            console.log(result.length);
            console.log("USer Found")
          res.status(200).send(result);
        } else {
          res.status(500).send("Server error, Please try again Later");
        }
        
    } else {
      res.status(500).send("Server error, Please try again Later");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});


module.exports = router;
