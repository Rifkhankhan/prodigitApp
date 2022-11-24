const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, location, genter, dob, password, cpassword, mobile, email } =
    req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); // check user is existing or not
  } catch (err) {
    const error = new HttpError("signing up failed ", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User Already Exist", 422);
    return next(error);
  }

  const haspassword = await bcrypt.hash(password, 12);


    const newUser = new User({
      name: name,
      email: email,
      location: location,
      genter: genter,
      dob: dob,
      password: haspassword,
      mobile: mobile,
    });


  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("signing up failed could not save ", 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: newUser.id, name: newUser.name },
      "prodigit",
      { expiresIn: "1h" }
    );


  } catch (err) {
    const error = new HttpError("signing up failed could not save ", 500);
    return next(error);
  }
  res.status(200).json({
    message: "Sign up Successfully",
    data: {
      userId: newUser.id,
      name: newUser.name,
      token: token,

      expiresIn: "1h"
    },
  });
};

const signIn = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email, password } = req.body;

  let identifyUser;
  try {
    identifyUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("signing up failed could not save ", 500);
    return next(error);
  }

  if (!identifyUser) {
    const error = new HttpError("email or Password is not Valid", 422);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifyUser.password);
  } catch (err) {
    const error = new HttpError("Password is not Valid", 422);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid Credential ,could not log you in",
      422
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: identifyUser.id,
        name: identifyUser.name,
        token: token,
      },
      "prodigit",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("signing in failed could not save ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "SignIn Successfully",
    data: {
      userId: identifyUser.id,
      name: identifyUser.name,
      token: token,

      expiresIn: "1h",
    },
  });
};

const updatePassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { currentPassword, newPassword, userId } = req.body;

  console.log(req.body);
  let validCurrentPassword = false;
  let user;
  console.log(userId);

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }
  console.log(user);
  try {
    validCurrentPassword = await bcrypt.compare(currentPassword, user.password);
    console.log(validCurrentPassword);
  } catch (err) {
    const error = new HttpError("Something went Wrong in Comparing old password", 500);
    return next(error);
  }

  if(!validCurrentPassword){
    const error = new HttpError("Current Password is not correct", 500);
    return next(error);
  }

  let hasNewPassword;
  try {
    hasNewPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError("User is not there provided by the id", 500);
    return next(error);
  }

    user.password = hasNewPassword;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("Updated Password is not saved ", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Updated Password Successfully",
    user: user.toObject({ getters: true }),
  });
};

const getUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

	let user;

	try {
		user = await User.findById(id);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!user) {
		res.status(201).json({ message: 'There is no user ' });
	} else {
    console.log(user);
		return res.status(201).json(user.toObject({ getters: true }));
	}
};

const getUserPassword = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const {id} = req.params;

  console.log(id);
	let user;

	try {
		user = await User.findById(id);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!user) {
		res.status(201).json({ message: 'There is no user ' });
	} else {
    console.log(user);
		return res.status(201).json(user.toObject({ getters: true }));
	}
};
exports.updatePassword = updatePassword;
exports.signUp = signUp;
exports.signIn = signIn;
exports.getUser = getUser;
exports.getUserPassword = getUserPassword;
