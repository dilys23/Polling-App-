const db = require("../database/connection");
const verifyOTP = require("./verifyOTP");
const bcrypt = require('bcryptjs');
const resetPassword = async (email, otp, newpassword, cfmpassword) => {
    if (!email || !otp || !newpassword || !cfmpassword) {
        return {
            status: 400,
            message: 'information invalid'
        };
    }
    try {
        const result = await verifyOTP(email, otp)
        if (result.status !== 200) {
            // return res.status(result.status).send(result.message);
            return {
                status: 400,
                message: 'information invalid'
            };
        }
        if (newpassword !== cfmpassword) {
            return {
                status: 400,
                message: 'passwords do not match'
            };
        }
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        await db.query(`update users set password = ? where email = ?`,[hashedPassword, email]);
        return {
            status: 200,
            message: 'reset password successfull'
        }



    } catch (error) {
        console.log('Error verify OTP', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };

    }
}
module.exports = resetPassword;