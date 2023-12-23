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


router.post("/signup", async (req, res) => {
    try {
      const connection = await getConnection();
  
      if (connection) {
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        const result = await query(connection, sql, [req.body.username, req.body.email, req.body.password]);
  
        // Handle the result as needed, e.g., send a success response
        res.status(200).send({ message: "User signed up successfully!" });
      } else {
        res.status(500).send("Server error, Please try again Later");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server error");
    }
  });


  router.post("/signup", async (req, res) => {
    try {
      const connection = await getConnection();
  
      if (connection) {
        const { username, email, password } = req.body;
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const result = await query(connection, sql, [username, email, password]);
  
        // Check if the insertion was successful
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "User signed up successfully!" });
        } else {
          res.status(500).json({ message: "Failed to sign up user" });
        }
      } else {
        res.status(500).json({ message: "Server error, Please try again later" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  });
  

module.exports = router;