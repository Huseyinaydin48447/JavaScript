//211
const express=require('express');
//216
const {getAccessToRoute}=require("../middlewars/authorization/auth");
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undoLikeAnswer}=require("../controllers/answer")
const router=express.Router({mergeParams:true});// bir önceki paremetreleri getirmek içinde mergeParams

 //225
 const {checkQuestionAndAnswerExist}=require("../middlewars/database/databaseErrorHelpers");
 //229
 const {getAnswerOwnerAccess}=require("../middlewars/authorization/auth"); 


// router.get("/",(req,res,next)=>{
//     console.log(req.params);
//     res.send("Answers Route");
// })

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
//220
router.get("/",getAllAnswersByQuestion);// soruları getirmek içinde
//222
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
//230
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
//232
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);

router.put("/:answer_id/like",[checkQuestionAndAnswerExist,getAccessToRoute],likeAnswer);
router.put("/:answer_id/undo_like",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],undoLikeAnswer);


module.exports = router;