const express = require('express');
var router = express.Router();
var PostController = require('../Controllers/Post');
const multer = require('multer');
const fileUpload = require('../middleware/file-upload')

const MIME_TYPE_MAP = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
	'image/jfif': 'jfif',

};
const storage = multer.diskStorage({
  destination:(req,res,cb) => {
    const isValid = MIME_TYPE_MAP[fileUpload.mimetype];

    let error  = new Error("Invalid mime type")

    if(isValid){
      error = null
    }

    cb(error,"uploads")
  },

  filename:(req,res,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');

    const ext = MIME_TYPE_MAP[file.mimetype]

    cb(null,name + '-'+Date.now() + '.' +ext);
  }
})

router.post('/create',fileUpload.single("image"), PostController.createPost);
router.patch('/updatePostById', PostController.updatePostById);
router.get('/posts', PostController.getPosts);
// router.delete('/post/:postId', PostController.deletePostById);

module.exports = router;
