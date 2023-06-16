//140
const express=require("express");
const {getSingleUser,getAllUsers}=require("../controllers/user")

//150
const {checkUserExist}=require("../middlewars/database/databaseErrorHelpers");
const router = express.Router();

//152
router.get('/',getAllUsers);

 router.get("/:id",checkUserExist ,getSingleUser);  //142
 
module.exports =router;


