const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUser, updateUser } = require("../controllers/user");
const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", auth, getUser);
router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
