const authService = require('../services/auth.services.js');
const sendEmail = require('../utils/sendEmail.js');
const {
    generateOTP,
    sendOTPEMail
} = require('../utils/sendResetPassEmail.js');
const verifyOTPsv = require('../utils/verifyOTP.js')
const resetnewPass = require('../utils/ResetPassword.js');
const registerUser = async (req, res) => {
    try {
        const user = await authService.registerService(req.body);
        if (user.error) {
            return res.status(400).json(user.error);
        }
        res.status(201).json({
            message: "Registered successfully",
            user: user
        });

    } catch (error) {
        res.status(500).send('An error occurred');

    }
}
const loginUser = async (req, res) => {
    try {
        const user = await authService.loginService(req.body);
        if (user.error) {
            return res.status(400).json(user.error);
        }
        res.status(201).json({
            message: "Login successfully",
            user
        });


    } catch (error) {
        res.status(500).send('An error occurred');
    }
}
const showloginForm = async (req, res) => {
    res.render('login');
}
const validateEmail = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const result = await authService.validateService(email);

        if (result.error) {
            return res.status(400).json({
                error: result.error
            });
        }

        res.status(200).json({
            message: 'Email valid in DB',
            email: result.email
        });
    } catch (error) {
        res.status(500).send('An error occurred');
    }
};
// const sendEmail = require('./sendEmail');

const sendMail = async (req, res) => {
    const {
        email,
        subject,
        text
    } = req.body;

    if (!email || !subject || !text) {
        return res.status(400).send('Email, subject, and text are required');
    }

    try {
        await sendEmail(email, subject, text);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('An error occurred while sending the email');
    }
};
const sendOTP = async (req, res) => {
    const {
        email
    } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    const otp = generateOTP();
    try {
        await sendOTPEMail(email, otp);
        res.status(200).send('OTP send success');

    } catch (error) {
        console.error('Error sending OTP: ', error);
        res.status(500).send('an occured')
        // res.json("")
    }
}

const verifyOTP = async (req, res) => {
    const {
        email,
        otp
    } = req.body;
    if (!email || !otp) {
        return res.status(400).send('Email, otp are required');
    }
    try {
        const result = await verifyOTPsv(email, otp);
        return res.status(result.status).send(result.message);
    } catch (error) {
        console.error('Error verify OTP: ', error);
        res.status(500).send('an occured')
    }
}
const resetPassword = async (req, res) => {
    const {
        email,
        otp,
        newpassword,
        cfmpassword
    } = req.body;
    if (!email || !otp || !newpassword || !cfmpassword) {
        return res.status(400).json("information is required");
    }
    try {
        const result = await resetnewPass(email, otp, newpassword, cfmpassword);
        return res.status(result.status).send(result.message);
    } catch (error) {
        console.error('Error reset password: ', error);
        res.status(500).send('an occured')

    }
}


const uploadFile = async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('No file uploaded');
    }
    res.status(200).send({
        message: "File is uploaded successfully"
    });
};

module.exports = {
    uploadFile,
    resetPassword,
    verifyOTP,
    sendOTP,
    sendMail,
    validateEmail,
    showloginForm,
    registerUser,
    loginUser
};