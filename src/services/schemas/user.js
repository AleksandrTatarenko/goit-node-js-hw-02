const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: [/[a-z0-9]+@[a-z0-9]+/, "user email is not valid"]
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minLength: [6, "Password should be ad least 6 characters long"]
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

user.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", user);

module.exports = User;