const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  avatar: {
    type: String,
    required: false,
    default: "",
    validate: {
      validator(value) {
        if (!value) return true;
        return validator.isURL(value, { require_protocol: true });
      },
      message: "You must enter a valid URL",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          return user;
        }

        return Promise.reject(new Error("Incorrect email or password"));
      });
    });
};

module.exports = mongoose.model("User", userSchema);
