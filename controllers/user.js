const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors/errors");

// GET user's info
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// UPDATE user info (name, avatar)
const updateUser = async (req, res, next) => {
  const { username, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// REGISTER a new user
const registerUser = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    });
  } catch (err) {
    next(err);
  }
};

// Login existing user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (err) {
    next(new UnauthorizedError("Incorrect email or password"));
  }
};

module.exports = {
  getUser,
  updateUser,
  registerUser,
  loginUser,
};
