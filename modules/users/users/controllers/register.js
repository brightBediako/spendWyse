const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../../managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  // validations...

  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 7) throw "Password must be at least 7 characters long.";

  if (!name) throw "Name is required";
  if (password !== confirm_password)
    throw "Password and confirmed password doesn't match!";

  // check if email already exists
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  res.status(201).json({
    status: "User registered successfully...",
    accessToken: accessToken,
  });
};

module.exports = register;
