const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UniqueValidator = require("mongoose-unique-validator");

const postSchema = new Schema({
  date: { type: String, required: true},
  like: { type: Number, required: true },
  dislike: { type: Number, required: true },
  comments: { type: Array, required: true },
  userComment: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
  share: { type: Number, required: true },
});
// userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model("Post", postSchema);
