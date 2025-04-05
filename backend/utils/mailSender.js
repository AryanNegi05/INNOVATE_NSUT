const nodemailer = require('nodemailer');

const mailsender = async (email,title ,body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_host,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }

        })

        let info = await transporter.sendMail({
            from:'StudyNotion',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log(info);
        return info
        

    } catch(er){
        console.log(er.message);
        
    }
}


module.exports = mailsender
