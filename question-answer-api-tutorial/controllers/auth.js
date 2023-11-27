//23
const User = require('../models/User.');
const CustomError = require("../helpers/error/CustomerError")//34
// 45  npm install express-async-handler
const asyncErrorWrapper = require("express-async-handler");
//  asyncErrorWrapper try kulanmamıza gerek kalmaz
 //73
 const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers");
//105
// const {validateUserInput}=require("../helpers/input/inputHelpers");//107
const {validateUserInput,comparePassword}=require("../helpers/input/inputHelpers");
//135
const sendEmail = require("../helpers/libraries/sendEmail");
const { response } = require('express');

const register =asyncErrorWrapper( async (req, res, next) => {
    
    //24
    // //POST DATA
    // const name = "huseyin";
    // const email = "huseyin@gmail.com";
    // const password = "123456";
    // // async ,await
    // const user = await User.create({
    //     name,  // name: name 
    //     email,
    //     password
    // })

    //POST DATA
    // const name = "melek";
    // const email = "melek@gmail.com";
    // const password = "12345";//50
    //30
    // try {
        // const user = await User.create({
        //     name,  // name: name 
        //     email,
        //     password
        // })//51
        // console.log(req.body);//52 //54 yorum içerisine
        const {name, email, password,role} = req.body;//55 //56 aşağo
          const user = await User.create({
            name,  // name: name 
            email,
            password,
            role
        })
        //74
         sendJwtToClient(user, res);



        //70
        // const token =user.generateJwtFromUser();
        // console.log(token);
         // res//72

        //     .status(200)
        //     .json({
        //         success: true,
        //         data: user
        //     });//72
    // }
    // catch (err) {
    //     return next(err);

    // }
    // async ,await
    // const user = await User.create({
    //     name,  // name: name 
    //     email,
    //     password
    // })

    // res
    //     .status(200)
    //     .json({
    //         success: true,
    //         data: user
    //     });//29
});

 //104
 



//100
const login =asyncErrorWrapper(async(req, res, next)=>{
    // console.log(req.body);
    // 104
   let{email, password}=req.body;
    // console.log(email,password);//105
    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your inputs",400));
    }
    //105
    // const user=await User.findOne({email});//email göre arar ve döndürür
    const user=await User.findOne({email}).select("+password");
    //108
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials",400));
    }
    // console.log(user);

    // res.status(200)
    // .json({
    //     success: true,
    // });//109
    sendJwtToClient(user,res);


});
//111

const logout=asyncErrorWrapper(async(req, res, next)=>{
const {NODE_ENV} = process.env;
return res.status(200)
.cookie({// sıfırlamak için
    httpOnly: true,
    expires: new Date(Date.now()), 
    secure:NODE_ENV === "development" ? false:true
})
.json({
    success:true,
    message:"Logout successfully"
})
     

});


//26
// const errorTest = (req, res, next) => {
//     // Some Code
//     // throw new Error("Bir hata oluştu")//32

//     // return next(new Error("Bir Hata oluştu"));//33
//     // return next(new CustomError("Custom Error Message", 400))//35 //39
//    //40
//    return next(new SyntaxError("Syntax Error"));

// }//79
//81
const getUser=(req,res,next) => {

    res.json({
        success:true,
        // message:"Welcome"//95
        data:{
            id:req.user.id,
            name:req.user.name
        }
    });
};
 //117
 const imageUpload=asyncErrorWrapper(async(req, res, next)=>{
    //Image upload Success
    //118
    const user=await User.findByIdAndUpdate(req.user.id,{
        "profile_image":req.savedProfileImage  
    },{
        new:true,// güncelemiş fot. eklemek için new =true olması gerekiyor
        runValidators:true
    });

    res.status(200).json({
        success:true,
        message:"Image Upload SuccessFull",
        //119
        data:user
    });
 });
 //125 Forgot Password
 const forgotPassword=asyncErrorWrapper(async(req, res, next)=>{ 

    const resetEmail=req.body.email;
    const user=await User.findOne({email:resetEmail});

    if(!user){
        return next(new CustomError("There is no user with that email"),400)
    }
    const resetPasswordToken=user.getResetPasswordTokenFromUser();

    await user.save();//129

    //134
  const resetPasswordUrl=`https://localhost:5050/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`  

  const emailTemplate=`
  <h3> Reset Your Password</h3>
  <p>This <a href='${resetPasswordUrl}' target='_blank'>link</a> Will expire in 1 hour</p>
  
  `;
  try{
    await sendEmail({
        from:process.env.SMTP_USER,
        to:resetEmail,
        subject:"Rest Your Password",
        html:emailTemplate
    });
    return res.status(200).json({
        success:true,
        message:"Token Send To Your Email"

    });
  }
  catch(err){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    return next(new CustomError("Email Could Not Be Sent"),500);
  }


    // res.json({
    //     success:true,
    //     message: "Token Sent To Your Email"

    // });//134

 });
 //139

 const resetPassword=asyncErrorWrapper(async(req, res, next)=>{
 //139
        const {resetPasswordToken}=req.query;

        const {password}=req.body;
        if(!resetPasswordToken){
            return next(new CustomError("Please provide a valid token"),400);
        }
        let user =await User.findOne({
           resetPasswordToken:resetPasswordToken,
           resetPasswordExpire:{$gt: Date.now()} 
        });
        if(!user){
            return next(new CustomError("Invalid Token or Session Expired"),400);
        }
        // save veri tabanına yazmamızı sağlar

        user.password=password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save();

    return res.status(200).json({
        success:true,
        message:"Reset Password Process SuccessFull"
    });
 })
 //172
  const editDetails=asyncErrorWrapper(async(req, res, next)=>{
    const editInformation=req.body;

    const user=await User.findByIdAndUpdate(req.user.id, editInformation,{
        new:true,
        runValidators:true
    });
    return res.status(200).json({
        success: true,
        data: user
    });
  });


module.exports = {
    register,
    // errorTest//27
    login,   //101
    getUser,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails

}