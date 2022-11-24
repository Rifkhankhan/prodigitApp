const express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/Auth');
var fileUpload = require('../middleware/file-upload');
const multer = require('multer');


router.post('/SignUp', AuthController.signUp);
router.post('/SignIn', AuthController.signIn);
router.get('/getUser/:id', AuthController.getUser);
router.get('/getUserPassword/:id', AuthController.getUserPassword);
router.patch('/updatePassword', AuthController.updatePassword);

module.exports = router;
