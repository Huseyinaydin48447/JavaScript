//105
const bcrypt=require('bcryptjs');


//104 email ve pass0word boş ve dolu na göre işlem

const  validateUserInput=(email,password)=>{
    return email && password;
};
//106
const comparePassword=(password,hashedPassword)=>{
    return bcrypt.compareSync(password,hashedPassword);
}

module.exports ={
    validateUserInput,
    comparePassword
}