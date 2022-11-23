const express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/Auth');
var fileUpload = require('../middleware/file-upload');
const multer = require('multer');


router.post('/SignUp', AuthController.signUp);
router.post('/SignIn', AuthController.signIn);
router.post('/updatePassword/:userId', AuthController.updatePassword);

module.exports = router;
