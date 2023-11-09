const express=require("express");
const mysql=require("mysql");
const app=express();
const dotenv=require("dotenv");
const path=require("path");

dotenv.config({path:'.env'})


const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:process.env.DATABASE
})


// görünüm motoru
app.set('view engine', 'hbs')


// mysql sağlamak için 
db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("MySQL connection")
    }
})

app.get("/", (req, res) => {
    res.send("<h1> Home Page</h1>")
})

app.listen(5000,()=>{
    console.log("server started on port 5000");
})