// const mongoose = require('mongoose');
// const mailsender = require('../utils/mailSender');
//  const otpschema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },

//     otp:{
//             type:String,
//             required:true
//     },

//     createdAt : {
//         type:Date,
//         default:Date.now, 
//         expires:60*5,
        
//     }
//  })

//  //fucntion to send eami
//  async function  sendverificEmail(email,otp){
//     try{
//         const mailResponse = await mailsender(email , "verification Email from StudyNotion",otp);
//         console.log("email sent",mailResponse);
        

//     } catch(er){
//         console.log("error while sending email occured");
        

//     }
//  }


// otpschema.pre("save",async function(next){
//     await sendverificEmail(this.email,this.otp);
//     next();
// })
//  module.exports = mongoose.model("OTP",otpschema);