//43
const CustomerError = require('../../helpers/error/CustomerError');

//27
const customErrorHandler = (err, req, res, next) => {
    //36 error yakalamak içinde
    let customError = err;
        // console.log(err);

    // console.log(customError.message,customError.status);//41
    //42
    // console.log( customError.name ,customError.message,customError.status);

    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400);
    }
    // if (err.name === "ValidationError") {
    //     customError = new CustomError(err.message, 400);
    // }
    if(err.name === "CastError") {
        customError = new CustomError("Please provide a valid id",400)
    }
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    });
    //44
    // console.log(customError.message, customError.status);


    // res
    //     .status(400)
    //     .json({
    //         success: false
    //     })

};
module.exports = customErrorHandler;

