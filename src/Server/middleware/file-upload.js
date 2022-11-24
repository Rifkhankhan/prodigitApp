const multer = require('multer');
const { storage } = require('debug/src/browser');
const MIME_TYPE_MAP = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
	'image/jfif': 'jfif',

};
const fileUpload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads');
		},

		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
      req.body.filename = 'filenametogive';
			cb(null, Date.now() + '.' + ext);
		},
		fileFilter: (req, file, cb) => {
			const isValid = !!MIME_TYPE_MAP[file.mimetype];
			const error = isValid ? null : new Error('Invalid Mime Type');
			cb(error, isValid);
		}
	})
}); //it provide middleware

// module.exports = fileUpload;

module.exports = multer({ storage: fileUpload});
