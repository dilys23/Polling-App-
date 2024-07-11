const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const uploadFileMidleware = require('../middleware/uploadFile.js');
const userController = require("../controllers/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id",verifyToken, userController.getUserById);
router.post("/", verifyToken,userController.createUser);
router.put("/:id",verifyToken, userController.updateUser);
router.delete("/:id",verifyToken, userController.deleteUser);
router.post('/uploadfile',verifyToken, uploadFileMidleware, authController.uploadFile);

module.exports = router;
