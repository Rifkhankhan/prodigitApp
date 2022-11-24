const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	name: { type: String, required: true},
	genter: { type: String, required: true },
	location: { type: String, required: true },
	email: { type: String, required: true ,unique:true},
	password: { type: String, required: true },
	mobile: { type: String, required: true },
	dob: { type: String, required: true },

});
userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('User', userSchema);
