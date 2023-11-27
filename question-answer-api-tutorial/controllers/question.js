// const getAllQuestions=(req,res,next)=>{
//     //(15)
//     res
//     .status(200)
//     .json({
//         success:true
//     })

// }
// // dışarı aktarmak içinde 
// module.exports={
//     getAllQuestions
// }//177
const Question=require("../models/Question");
const CustomerError=require("../helpers/error/CustomerError");
const asyncErrorWrapper=require("express-async-handler");

//181
const getAllQuestions=asyncErrorWrapper(async(req,res,next)=>{
//300
console.log(req.query.search);
    
    
    const question=await Question.find();

    return res.status(200).json({
        success: true,
        data:question
    })
});


const askNewQustion=asyncErrorWrapper(async(req,res,next)=>{
    const information=req.body;

    const question=await Question.create({
       ...information,// tüm alanları vermek içinde ...
       user:req.user.id 
    });
    res.status(200).json({
        success: true,
        data:question
    });
});
//188
const getSingleQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
  
    const question=await Question.findById(id);

    return res.status(200).json({
        success: true,
        data:question
    })
});
//192

const editQuestion=asyncErrorWrapper(async(req,res,next)=>{
  const {id}=req.params;
  const {title,content}=req.body;

  let question=await Question.findById(id);
  question.title=title;
  question.content=content;

  question=await question.save();// bilgiler günceldikten sonra yazmak içinde


    return res.status(200).json({
        success: true,
        data:question
    })
});
//201 202
const deleteQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;

    await Question.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        data:"Question deleted operation Successfully"
    });

});
//207
const likeQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    //like etmişse
    if(question.likes.includes(req.user.id)){// etmişse etmesin diye
        return next(new CustomerError("You already liked this question",400));

    }
    question.likes.push(req.user.id);
    await question.save();
    return res.status(200).json({
        success: true,
        data:question
    });


});
//208
const undoLikeQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    
    if(!question.likes.includes(req.user.id)){
        return next(new CustomerError("You can not undo like operation this question",400));

    }
    const index = question.likes.indexOf(req.user.id);

    question.likes.splice(index, 1);

    await question.save();
    return res.status(200).json({
        success: true,
        data:question
    });
});



module.exports ={
    askNewQustion,
    getAllQuestions,
    getSingleQuestion, //187
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
};