//144
const User = require("../models/User.");
const CustomError = require("../helpers/error/CustomerError")//34
const asyncErrorWrapper = require("express-async-handler");

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError("There is no duch user with that id"), 400)
    }//151
    return res.status(200)
        .json({
            success: true,
            data: user
        });
});
//153
const getAllUsers = asyncErrorWrapper(async (req, res, next) => {

    const users= await User.find();

    return res.status(200).json({
        success:true,
        data: users
    });
});

module.exports = {
    getSingleUser,
    getAllUsers
};