const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
// const uploadFile = require("../middleware/uploadFile.js");
const uploadFileMidleware = require('../middleware/uploadFile.js');
// Auth routes
router.post('/login', authController.loginUser);
router.get('/login', authController.showloginForm);
router.post('/register', authController.registerUser);
router.post('/validateEmail', authController.validateEmail);
router.post('/sendMail', authController.sendMail);
router.post('/sendOTP', authController.sendOTP);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resetPassword', authController.resetPassword);
router.post('/uploadfile', uploadFileMidleware, authController.uploadFile);
module.exports = router;