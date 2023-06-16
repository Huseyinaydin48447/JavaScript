//(7)
const express = require("express");
//19
// const {register} = require('../controllers/auth');25
// const { register } = require('../controllers/auth');// 25
//81
const { register, getUser, login, logout, imageUpload, forgotPassword, resetPassword,editDetails } = require('../controllers/auth');
//83
const { getAccessToRoute } = require("../middlewars/authorization/auth");

// 115 116
const profileImageUpload = require("../middlewars/libraries/profilelmageUpload");



//  api/auth
const router = express.Router();
router.post("/register", register);

router.post("/login", login);   //103

// router.get('/',(req,res)=>{// buradaki / bu yani bunu yazdıktan sonra bizim on göre işlem yapmak
//     res.send("Auth Home Page");

// })//17
//18
// router.get("/register", register);

//19
//24
// router.get("/error", errorTest);//79



// router.get('/register',(req,res)=>{
//     res.send("Auth Register Page");

// })
// bu sayfadakilerini dışa aktarmak içinde
//80
// router.get("/tokentest",getAccessToRoute,tokentest);//93
router.get("/profile", getAccessToRoute, getUser);
//110
router.get("/logout", getAccessToRoute, logout);
//116
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.post("/forgotpassword", forgotPassword);  //123,124
router.put("/resetpassword", resetPassword);  //136
router.put("/edit", getAccessToRoute, editDetails); //171,getAccessToRoute bu sadece giriş yapaanlar üzerinden  değişkenlik yapmasını sağlar

module.exports = router;