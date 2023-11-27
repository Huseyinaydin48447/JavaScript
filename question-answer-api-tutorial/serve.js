const express = require("express");
const dotenv = require("dotenv");   //(5) dotenv ekleyip çağıryor
//(14)
// const routers=require("./routers/index")// index ana olduğu için
const connectDatabase = require("./helpers/database/connectDatabase")//22
const customErrorHandler = require("./middlewars/errors/customErrorHandler")   //28
//113 path express içinde olan bir pakettir
const path=require("path");

const routers = require("./routers");

const app = express();
   //53 Express -Body Middleware
   app.use(express.json());
//(9) 
// const question=require("./routers/question");
// const auth=require("./routers/auth");

//(6) Environment Variables
dotenv.config({
    path: './config/env/config.env'// config.env yolunu bulmak için

})

// require('dotenv').config({ path: path.resolve(__dirname, '../.config/') });

//23
// MongoDb Connection
connectDatabase(); // connectDatabase calıştırmak için bunu yaptık


// const PORT=5000 || process.env.PORT;
const PORT = process.env.PORT;//(7) 5000 sildik config.envden orda var oradaki herşeyi kullanabilriz
//(10) 9 kullanmak içinde
// Routers Middleware  
//(11)
// app.use("/api/questions",question);
// app.use("/api/auth",auth);

app.use("/api",routers);

// //25
// app.use((err, req, res, next) => {
//     console.log("Custom Error Handler ");
//     res
//         .status(400)
//         .json({
//             success: false
//         })

// })//29
app.use(customErrorHandler);

//112
// Static Files
// console.log(__dirname);
//114 __dirname ile public bağlar

app.use(express.static(path.join(__dirname,"public")));





app.listen(PORT, () => {
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
});
//(2) çıktıda connect get verdiği için onu önlemek bir şey yazmak için /
app.get('/', (req, res) => {
    res.send("Hello Question Answer Api")
})
