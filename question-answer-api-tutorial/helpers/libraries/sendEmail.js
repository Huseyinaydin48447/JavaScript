//132
const nodemailer = require('nodemailer');

// kime gideçegi nasıl gideçegi mailOptions sağlanır
const sendEmail =async(mailOptions)=>{
    let tranporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });
      //yukarıdaki başarılı olursa
      let info =await tranporter.sendMail(mailOptions);
      console.log(`Message: ${info.messageId}`);
}
module.exports = sendEmail;