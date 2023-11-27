const express=require("express");
const {getAccessToRoute,getAdminAccess} = require("../middlewars/authorization/auth");
  const {blockUser,deleteUser}=require("../controllers/admin");  //167
const { checkUserExist } = require("../middlewars/database/databaseErrorHelpers");
   //168
   
// Delete User

const router =express.Router();
//164
// router.get("/",(req,res,next)=>{
    // (req,res,next)=>{//166

    //     res.status(200)
    //     .json({
    //         success: true,
    //         message:"Admin Page"
    //     });
    // })

    // Block User
    


    router.use([getAccessToRoute,getAdminAccess]);
    // router.use(checkUserExist);//167 user olup olmadığına bakar// böyle çalışmaz
    router.get("/block/:id",blockUser,checkUserExist)//166
    router.delete("/user/:id",checkUserExist,deleteUser);  //169

module.exports =router;