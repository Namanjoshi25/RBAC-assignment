const nodemailer  = require("nodemailer")
const User = require('../models/User');


 async  function sendVerificationEmail(email , token , userId ){

    try {
       
  
        await User.findByIdAndUpdate(userId , {verificationToken : token })

    

    const transport = await  nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS
          //TODO: add these credentials to .env file
        
     }
    })

    const mailOptions = {
        from : 'naman@gmail.com',
        to : email,
        subject :  "Verify your email id" ,
        html:
    
        `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}&userId=${userId}">here</a> to "verify your email" 
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${token}
        </p>`
     
    }
        
    const mailRes=  await transport.sendMail(mailOptions)

    return mailRes ;
    } catch (error ) {
        console.log(error);
        throw new Error("error in mailer" , error)
      
        
    }
}

module.exports= {sendVerificationEmail}