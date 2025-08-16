const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validator using validator.js
const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validate user signup
const validateUserRegister = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
      "any.required": 'The "name" field is required',
    }),
    avatar: Joi.string().uri().optional().allow("", null),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "any.required": 'The "email" field is required',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

// Validate user login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "any.required": 'The "email" field is required',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": 'The "password" field is required',
    }),
  }),
});

// Validate user login
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .optional()
      .allow("", null) // allow empty or null
      .custom((value, helpers) => {
        if (!value) return value; // skip validation if empty
        if (!validator.isURL(value, { require_protocol: true })) {
          return helpers.error("string.uri");
        }
        return value;
      })
      .messages({
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "username" field is 2',
      "string.max": 'The maximum length of the "username" field is 30',
      "string.empty": 'The "username" field must be filled in',
      "any.required": 'The "username" field is required',
    }),
  }),
});

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
};
