const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: '.env' });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alisveris'
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connection");
    }
});

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use cors middleware
app.use(cors());

app.post("/login", (req, res) => {
    const { kullaniciAdi, parola } = req.body;

    // Perform your MySQL query to check the credentials
    const query = "SELECT * FROM alisveris WHERE username = ? AND password = ?";
    db.query(query, [kullaniciAdi, parola], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (result.length > 0) {
            // User authenticated successfully
            res.status(200).send("Login successful");
        } else {
            // Incorrect username or password
            res.status(401).send("Invalid credentials");
        }
    });
});

// Static dosyaları servis etmek için public klasörünü kullan
app.use(express.static(path.join(__dirname, "public")));

// "/" yoluna yapılan isteklerde "index.html" dosyasını gönderin
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server'ı dinle
app.listen(5051, () => {
    console.log("Server port 5050'de çalışıyor");
});
