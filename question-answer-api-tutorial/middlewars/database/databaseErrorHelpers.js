const User = require("../../models/User.");
const CustomerError = require("../../helpers/error/CustomerError");
const Question = require("../../models/Question")     //183
const asyncErrorWrapper = require("express-async-handler");
//223
const Answer=require("../../models/Answer");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError("There is no user with that id", 400));
    }
    next();
});

//184
const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
    // const {id}=req.params;//213
    const guestion_id = req.params.id || req.params.guestion_id;//

    // const user = await Question.findById(id);
    const user = await Question.findById(guestion_id);


    if (!Question) {
        return next(new CustomError("There is no user with that id", 400));
    }
    next();
});
//224
const checkQuestionAndAnswerExist=asyncErrorWrapper(async(req, res, next)=>{
    const question_id=req.params.question_id;
    const answer_id=req.params.answer_id;

    const answer = await Answer.findOne({
        _id: answer_id,
        question:question_id
    });

    if(!answer){
        return next(new CustomerError("There is no answer with that id associated with question id",400));  
    }
    next();
});


module.exports = {
    checkUserExist,
    checkQuestionExist,
    checkQuestionAndAnswerExist
};