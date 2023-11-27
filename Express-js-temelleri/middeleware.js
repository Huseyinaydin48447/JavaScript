const accessControl=(req,res,next)=>{
//(5)
//(9)
const access=true;
if(!access){
    res.status(401).json({
        success:false,
        message:"You are not authorized"
    })
}
    console.log("Middleware: Access Control");
    next();
};
//(10)
const defaultMiddleware =(req, res, next) => {
    console.log("default middleware");
    next();
};
module.exports ={
    accessControl,
    defaultMiddleware
};