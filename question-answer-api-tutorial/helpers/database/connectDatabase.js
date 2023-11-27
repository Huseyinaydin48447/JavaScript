//21
const mongoose=require('mongoose');

const connectDatabase=() =>{
    mongoose.set('strictQuery', false);

    // mongoose.connect('mongodb://127.0.0.1:27017/test')//22
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
    
// yukarıdaki bize bir promise gönderir
.then (()=>{
    console.log("MongoDb Connection Successful")

})
.catch(err => {
    console.error(err);
})

};
module.exports=connectDatabase;