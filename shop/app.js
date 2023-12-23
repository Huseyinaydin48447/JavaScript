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
