const mongoose = require("mongoose");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  // validations...
  if (!email) throw "Email must be provided!";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email doesn't exist!";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

// send email to the user
  await emailManager(
    createdUser.email,
    "Welcome to spendWy$se",
    `Hello ${getUser.name}, use this code to reset your password: <h2>${resetCode}</h2>`,
    `Hello ${getUser.name}, use this code to reset your password: ${resetCode}`
  );

  res.status(201).json({
    status: "Forgot password request sent to the Email provided...",
    // accessToken: accessToken,
  });
};

module.exports = forgotPassword;
