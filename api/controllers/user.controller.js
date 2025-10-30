import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { createError } from "../middlewares/errorHandlerMiddleware.js";
import bcrypt from "bcrypt";

// get user profile
export const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    throw new Error("User not found");
  }

  // send response
  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
});

// change password
export const changePassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  // find user
  const user = await User.findById(req.user);
  if (!user) {
    throw new Error("User not found");
  }

  // hash new password
  const hash = bcrypt.hashSync(newPassword, 5);
  user.password = hash;
  await user.save(
    validateBeforeSave = false,
  );

  res.status(200).json({ message: "Password updated successfully" });
});

// update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user,
    {
      username,
      email,
    },
    { new: true }
  );
  // check if user exists
  if (!updatedUser) {
    return next(createError(404, "User not found"));
  }
  res.status(200).json({
    message: "Profile updated successfully",
    id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

// delete user
export const deleteProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, "User not found!"));

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Your account has been deleted.");
});
