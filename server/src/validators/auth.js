const { check } = require('express-validator');
const { compare } = require('bcryptjs');
const { users } = require('../../models');

// password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password must be between 6 and 15 characters.');

// email
const email = check('email')
  .isEmail()
  .withMessage('Please provide valid email.');

// check if email exists
const emailExists = check('email').custom(async (value) => {
  const rows = await users.findAll({
    where: { email: value },
  });

  if (rows.length) {
    throw new Error('Email already exists.');
  }
});

// username validation
const username = check('username')
  .isLength({ min: 4, max: 15 })
  .withMessage('Username must be between 4 and 15 characters.');

const usernameExists = check('username').custom(async (value) => {
  const rows = users.findAll({
    where: { username: value },
  });
  if (rows.length) {
    throw new Error('Username already exists.');
  }
});

// login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await users.findAll({
    where: { email: value },
    raw: true,
  });

  if (!user.length) {
    throw new Error('Email does not exist.');
  }

  const validPassord = await compare(req.body.password, user[0].password);

  if (!validPassord) {
    throw new Error('Invalid password.');
  }

  req.user = user[0];
});

module.exports = {
  registerValidation: [email, password, username, emailExists, usernameExists],
  loginValidation: [loginFieldsCheck],
};
