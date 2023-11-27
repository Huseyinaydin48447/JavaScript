//82
const CustomError=require("../../helpers/error/CustomerError");
const jwt=require("jsonwebtoken");
//86
const {isTokenIncluded, getAccessTokenFromHeader}=require("../../helpers/authorization/tokenHelpers")
//162
const asyncErrorWrapper = require("express-async-handler");
const User=require("../../models/User.")
const Question=require("../../models/Question");  //189
//227
const Answer=require("../../models/Answer");

const getAccessToRoute=(req,res,next)=>{
    //Token
//90
const {JWT_SECRET_KEY}=process.env;

    // console.log(req.headers.authorization);//87
    if(!isTokenIncluded(req)){
        //401 403
        //401 Unauthorized
        //403 Forbidden
        return next(
            new CustomError(" 1 You are not authorized to access this route",401))
    }
    //89
    const accessToken = getAccessTokenFromHeader(req);
    //91
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded) => {
       if (err) {
        return next(
            new CustomError("You  are not authorized to access this route",401)
            );
       } //92
       req.user={
        id:decoded.id,
        name:decoded.name
       }
       console.log(decoded);
       next();

    })


    //CustomerError
}
//161
const getAdminAccess=asyncErrorWrapper(async (req,res,next) =>{
//163  

    const {id} =req.user;
    const user = await User.findById(id);

    if(user.role !== 'admin'){
        return next(new CustomError("Only admin can access this route"),403);

    }

    next();
});
//190

const getQuestionOwnerAccess=asyncErrorWrapper(async (req,res,next) =>{
    const userId=req.user.id;
    const questionId=req.params.id;

    const question= await Question.findById(questionId);

    if(question.user != userId){
        return next(new CustomError("Only owner can handle this operation",403))
    }
    next();
    
    });
    //208
    const getAnswerOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{
        const userId = req.user.id;
        const answerId=req.params.answer_id;

        const answer = await Answer.findById(answerId);

        if(answer.user != userId){
            return next(new CustomError("Only owner can handle this operation",403));
        }
        next();
    });

module.exports ={
    
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
};