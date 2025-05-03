const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
      email: email,
  });

  if (!getUser) throw "User not found!";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Password is incorrect!";

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "success",
    message: "User logged in successfully!",
    accessToken: accessToken,
  });
};
module.exports = login;
