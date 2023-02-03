const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, verificationToken) => {
    sgMail
        .send({
            to: `${email}`, // Change to your recipient
            from: 'aleksandrcrimea96@gmail.com', // Change to your verified sender
            subject: 'User verification',
            text: `Good day! Please verify your account if you want to use nickname. http://localhost:3000/api/users/verify/:${verificationToken}`,
            html: ``,
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        })
}

module.exports = sendEmail