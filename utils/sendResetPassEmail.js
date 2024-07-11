const crypto = require('crypto');
const sendEmail = require('./sendEmail');
const db = require('../database/connection');

const generateOTP = () =>
    {
        return Math.floor(100000 + Math.random() * 900000).toString();

    }
const sendOTPEMail = async (email, otp )=>
{
    const message = `<p> Your OTP for reset password is : <p>
                      <p> ${otp} <p>`;
    try {
        const query = 'UPDATE users SET OTP = ?, created_at = CURRENT_TIMESTAMP WHERE email = ?';
        await db.query(query, [otp, email]);
        await sendEmail(email, 'Password Reset OTP ', message);
        console.log('OTP sent successully');
        
    } catch (error) {
        console.log('Error sending OTP ', error);
        throw new Error('Failed to send OTP');
        
    }
}
module.exports = {
    generateOTP,
    sendOTPEMail
};
