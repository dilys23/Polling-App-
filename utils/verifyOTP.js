const db = require("../database/connection");

const verifyOTP = async(email, otp)=>
    {
        const expirationTimeInMinutes = 5;
        try {
            const [rows] = await db.query('select OTP, created_at from users where email = ?', [email]);
            const user = rows[0];
            console.log(user);
            if (!user )
                {
                    return { status: 400, message: 'email invalid' };
                }
            
            const otpCreatedAt = new Date (user.created_at);
            console.log(otpCreatedAt);
            const currentTime = new Date();
            const timecheckOTP = (currentTime - otpCreatedAt)/1000/60;
            console.log(timecheckOTP);
            if (timecheckOTP > expirationTimeInMinutes)
                {
                    return { status: 400, message: 'OTP đã hết hạn' };
                }

            if (otp != user.OTP)
                {
                    console.log(otp);
                    console.log(user.OTP);
                    return { status: 400, message: 'OTP không hợp lệ' };
                }
                 return { status: 200, message: 'verify OTP success' };
            
        } catch (error) {
            console.log('Error verify OTP', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }

module.exports = verifyOTP;