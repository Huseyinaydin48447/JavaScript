//165 bloklama işlemi

const User=require("../models/User.");
const CustomerError=require("../helpers/error/CustomerError");
const asyncErrorWrapper=require("express-async-handler");

const blockUser = asyncErrorWrapper(async(req,res,next)=>{
    //169
    const {id} = req.params;
    const user=await User.findById(id);
    user.blocked=!user.blocked;
    await user.save();

    return res.status(200).json({
        success: true,
        message:"Block -Unblock Successfully"
    })

});
//170 
    const deleteUser= asyncErrorWrapper(async(req,res,next)=>{
          const {id}=req.params;

          const user = await User.findById(id);

          await user.remove();

          return res.status(200).json({
            success: true,
            message:"Deleted Opeartion SuccessFull"

          });
    });

module.exports={
    blockUser,
    deleteUser
};