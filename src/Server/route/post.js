const express = require('express');
var router = express.Router();
var PostController = require('../Controllers/Post');
var fileUpload = require('../middleware/file-upload');
const multer = require('multer');


router.post('/create', PostController.createPost);
router.get('/:postId', PostController.getPost);
router.get('/posts/:userId', PostController.getPostsByUserId);
router.delete('/post/:postId', PostController.deletePostById);

module.exports = router;
