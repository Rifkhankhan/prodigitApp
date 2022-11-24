const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createPost = async (req, res, next) => {
	// const errors = validationResult(req);

	// if (!errors.isEmpty()) {
	// 	throw new HttpError('Invalid inputs passed, please check your data.', 422);
	// }

	console.log(req.body.files);
	const url = req.protocol + '://' + req.get('host');
	const newPost = new Post({
		date:new Date().toISOString() ,
		like: 0,
		userComment: req.body.comment,
    comments:[],
		// image: url + '/uploads/' + req.files.filename,
		userId: req.body.userId,
		dislike: 0,
    share:0
	});
	console.log(newPost);

	try {
		await newPost.save();
	} catch (err) {
		const error = new HttpError('Creating Post failed,try again', 500);
		return next(error);
	}
	res.json({ newPost: newPost.toObject({ getters: true }) });
};

const getPosts = async (req, res, next) => {



	let posts;

	try {
		posts = await Post.find();
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!posts || posts.length === 0) {
		res.status(201).json({ message: 'There is no Posts' });
	} else {
		res.status(200).json({
			posts: posts.map((Post) =>
				Post.toObject({ getters: true })
			)
		});
	}
};

const getPost = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { postId } = req.params;
	let Post;
	try {
		Post = await Post.findById(postId);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!Post) {
		res.status(201).json({ message: 'There is no Post ' });
	} else {
		return res.status(201).json(Post.toObject({ getters: true }));
	}
};



const deletePostById = async (req, res, next) => {
	const PostId = req.params.PostId;
	let Post;
	try {
		Post = await Post.findById(PostId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete Post',
			500
		);
		return next(error);
	}

	try {
		await Post.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete Post',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted Post' });
};

exports.getPosts = getPosts;
exports.getPost = getPost;
exports.deletePostById = deletePostById;
exports.createPost = createPost;
