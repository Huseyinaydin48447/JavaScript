//217,
const Question=require("../models/Question");
const Answer=require("../models/Answer");
const CustomerError=require("../helpers/error/CustomerError");
const asyncErrorWrapper=require("express-async-handler");

const addNewAnswerToQuestion =asyncErrorWrapper(async (req,res,next)=>{
    const {question_id}=req.params;
    const user_id=req.user.id;

    const information=req.body;
    const answer=await Answer.create({
       ...information,
       question:question_id,
       user:user_id 
    });
    return res.status(200)
    .json({
        success:true,
        data: answer
    })
});
//221
const getAllAnswersByQuestion=asyncErrorWrapper(async (req,res,next)=>{
    const {question_id}=req.params;
    const question=await Question.findById(question_id).populate("answers");
    // id göre population bütün verileri alır
    const answers=question.answers;

    return res.status(200)
    .json({
        success:true,
        count: answers.length,
        data:answers
    });

});
//226
const getSingleAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(answer_id)
    // .populate("question")
    // .populate("user");
    .populate( {
            path:"question",
            select:"title"
        })
    .populate({
        path:"user",
        select:"name profile_image"
    })

    return res.status(200)
    .json({
        success:true,
        data: answer
    });

});

//231
const editAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const {content}=req.body;

    let answer =await Answer.findById(answer_id);
    answer.content=content;

    await answer.save();
    
    return res.status(200)
    .json({
        success:true,
        data: answer
    });

});
//233
const deleteAnswer=asyncErrorWrapper(async(req,res,next)=>{
  const {answer_id}=req.params;
  const {question_id}=req.params;

  await Answer.findByIdAndRemove(answer_id);
  const question= await Question.findById(question_id);

  question.answers.splice(question.answers.indexOf(answer_id), 1);
  await question.save();
 
  return res.status(200)
  .json({
      success:true,
      message:"Answer deleted successfully"
  });
});


const likeAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(id);
    //like etmişse
    if(answer.likes.includes(req.user.id)){// etmişse etmesin diye
        return next(new CustomerError("You already liked this question",400));

    }
    answer.likes.push(req.user.id);
    await answer.save();
    return res.status(200).json({
        success: true,
        data:answer
    });


});
//208
const undoLikeAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(id);
    
    if(!answer.likes.includes(req.user.id)){
        return next(new CustomerError("You can not undo like operation this question",400));

    }
    const index = answer.likes.indexOf(req.user.id);

    answer.likes.splice(index, 1);

    await answer.save();
    return res.status(200).json({
        success: true,
        data:answer
    });
});




module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer
}