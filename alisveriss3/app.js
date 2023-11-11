const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const api = require("./api/api");
const bodyParser = require("body-parser");
dotenv.config({ path: '.env' });



// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

app.use("/index", (req, res) => {
   // console.log(req)
    //console.log("hi")
     const { action } = req.body;
     if (api[action]) {
       api[action](req, res);
     } else {
       res.status(404).send("Invalid action");
     }
   });
// Insert a test user (you can remove this in production)
// app.get("/insert-test-user", (req, res) => {
//     const query = "INSERT INTO users (username, password) VALUES ('testuser', 'testpassword')";
//     db.query(query, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }
//         // res.status(200).send("Test user inserted successfully");
//         res.status(200).json({ message: "Login successful", username: kullaniciAdi });

//     });
// });

// app.post("/login", (req, res) => {
//     const { kullaniciAdi, parola } = req.body;
//     console.log("Received login request:", req.body);

//     // Perform your MySQL query to check the credentials
//     const query = "SELECT username FROM users WHERE username = ? AND password = ?";
//     db.query(query, [kullaniciAdi, parola], (err, result) => {
//         console.log("11");
//         if (err) {
//             console.log(err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }
//         console.log(result);
//         if (result.length > 0) {
//             console.log(result);
//             // User authenticated successfully
//             //res.status(200).json({ message: "Login successful", username: kullaniciAdi });
//             res.status(200).send(result)
//         } else {
//             // Incorrect username or password
//             res.status(401).send("Invalid credentials");
//         }
//     });
// });

// Static dosyaları servis etmek için public klasörünü kullan
app.use(express.static(path.join(__dirname, "public")));

// "/" yoluna yapılan isteklerde "index.html" dosyasını gönderin
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server'ı dinle
app.listen(5050, () => {
    console.log("Server port 5050'de çalışıyor");
});
