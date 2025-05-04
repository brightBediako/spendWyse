const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;



 // send email to the user
   var transport = nodemailer.createTransport({
     host: "sandbox.smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: "09f39b08410681",
       pass: "c7b9b9f7fc07b4",
     },
   });
 
   await transport.sendMail({
     to: to,
     from: "no-reply@spendWy$se.com",
     subject: subject,
     html: html,
     text: text,
   });

}


module.exports = emailManager;