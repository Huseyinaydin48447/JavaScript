const mongoose = require('mongoose');//22
const bcrypt = require('bcryptjs');   // 61
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")  //68
const crypto = require("crypto");  //121
 const Question=require("./Question");   //204
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "Please try different email"],// email. bir tane olamsını sağlar
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"

        ]

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: true,
        select: false,// şifreyi gizler
    },
    createdAt: {
        type: Date,
        default: Date.now(),// giriş yaptığı anki zamanı kapsar
    },
    title: {// bu kulllancını ve yönetçiyi göre giriş yapar
        type: String,
    },
    about: {// bir yerde çalıştını
        type: String,
    },
    place: {// nerde yaşadığını
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"// mecburu değil
    },
    blocked: {
        type: Boolean,
        default: false// ilk olarark false yani blok olmamış olacaktır
    },
    //120 bilgileri unuttunda email üzerinden almak
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    }

});
//67 UserSchema Methods
UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env// bbunları okumamızı sağlar process.env
    const payload = {
        id: this._id,
        name: this.name
    };
    // token oluşturmak içinde
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
    return token;

};
//122
UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(15).toString("hex");
    //127
    const { RESET_PASSWORD_EXPIRE } = process.env;
    // console.log(randomHexString);//126
    //126


    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex");

    // console.log(resetPasswordToken);

    // return resetPasswordToken; // yerleştirmek içinde
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);//1 SAAT GEÇERLİ OLACAK
    return resetPasswordToken;

}


UserSchema.pre("save", function (next) {
    // parola Değişme
    if (!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);


//57 user kaydetmeden önce bunu yapmamız gerekiyor.//pre önce demektir
UserSchema.pre("save", function (next) {
    // console.log("Pre Hooks :  Save");//57
    //  console.log(this.password);   //58 //59 web bcryptjs almamız gerekiyor
    //  //60 npm install bcryptjs//62
    // bcrypt.genSalt(10, function(err, salt) {
    // bir hatamız varsa customErrorHandler göderiyoruz//63

    //   if(err) next(err);
    //     bcrypt.hash(this.password, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         if(err) next(err);  //64
    //         this.password = hash;// yeni şifreyi göderdikten sonra
    //         next();
    //     });
    // });
    //65
    //66 parola değişme 
    if (!this.isModified("password")) {
        next();// parola değişemdi ise devam et ama değişti ise aşağıdaki işelmi yap
    }
    bcrypt.genSalt(10, (err, salt) => { //this dolayı =>
        if (err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) next(err);  //64
            this.password = hash;// yeni şifreyi göderdikten sonra
            next();
        });
    });
    // next();
})

UserSchema.post("remove",async function(){
    await Question.deleteMany({
        user:this._id
    });
})
module.exports = mongoose.model("User", UserSchema);
