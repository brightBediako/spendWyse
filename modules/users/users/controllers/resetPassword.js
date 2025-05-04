const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, reset_code, new_password } = req.body;

//   if (!email || !reset_code || !new_password) {
//     return res.status(400).json({
//       status: "Please provide all required fields",
//     });
//   }

if(!email) throw "Email must be provided!";
if (!reset_code) throw "Reset code must be provided!";
if (!new_password) throw "New password must be provided!";

  if (new_password.length < 7)
    throw "Password must be at least 7 characters long.";

  const getUserResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserResetCode) throw "Invalid reset code or email.";

  const hashedPassword = await bcrypt.hash(new_password, 12);
  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
        reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Password reset successfully...",
  });
};

module.exports = resetPassword;
