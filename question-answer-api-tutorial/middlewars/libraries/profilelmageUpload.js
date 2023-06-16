//115
const multer=require('multer');
const path=require('path');
const CustomerError=require("../../helpers/error/CustomerError");

// storage nereye kaydeceğimizi ve hangi isimle
// fileFilter hangi dosyalara izin verileceğini söyler

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        
        const rootDir=path.dirname(require.main.filename());// serve.js yolunu bulur
          // null hata yoksa diye kullanılır
          cb(null,path.join(rootDir,"/public/uploads"));
    },
    filename:function(req,file,cb){
        // File -Mimetype -image/png

        const extension=file.mimetype.split("/")[1];
        req.savedProfileImage="image_" +req.user.id +"." + extension;
        cb(null,req.savedProfileImage);
    }
});

const fileFilter=(req,file,cb) =>{

        let allowedMimeTypes=["image/jpg", "image/gif","image/jpeg","image/png"];

        if(!allowedMimeTypes.includes(file.mimetype)){
            return cb(new CustomerError("Please provide a valid image file",400),false);//2.parametresi false

        }
        //hata olmazsa
        return cb(null,true);
};
const profileImageUpload=multer({storage,fileFilter});

module.exports = profileImageUpload;
