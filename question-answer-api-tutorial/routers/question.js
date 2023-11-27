//(8)
const express = require("express");
//212
const answer=require("./answer");
//16
const { getAllQuestions,askNewQustion,getSingleQuestion ,editQuestion,deleteQuestion,likeQuestion,undoLikeQuestion} = require('../controllers/question');
  const {getAccessToRoute, getQuestionOwnerAccess}=require("../middlewars/authorization/auth")  //175
 const {checkQuestionExist} =require("../middlewars/database/databaseErrorHelpers"); //185
 
  
 // api/questions
const router = express.Router();

// router.get('/',(req,res)=>{// buradaki / bu yani bunu yazdıktan sonra bizim on göre işlem yapmak
//     // res.send("Questions Home Page");
//     res.status(404).json({
//                 success:false

//     }
//     ) 

// }) //(15)
// router.get("/", getAllQuestions)        //(16)
 router.get("/",getAllQuestions);  //180
 router.get("/:id",checkQuestionExist,getSingleQuestion);  //186
//checkQuestionExist öyle bir aydının var olup olmadığına bakar
router.post("/ask", getAccessToRoute,askNewQustion) //174
//191
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
//200
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
//205
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undoLikeQuestion);
//213
router.use("/:question_id/answers",checkQuestionExist,answer);

// router.get('/delete',(req,res)=>{
//     res.send("delete Register Page"); 

// })
// bu sayfadakilerini dışa aktarmak içinde
module.exports = router;