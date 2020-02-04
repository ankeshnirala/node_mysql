const nodemailer = require('nodemailer');

const sendEmail = async option => {
    // 1) create a transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                password: process.env.EMAIL_PASSWORD
            }
            //activate in gmail 'less secure app' option

        });
    // 2) define the email option
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: option.email,
            subject: option.subject,
            text: option.message
        };

    // 3) send the email
      await  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;