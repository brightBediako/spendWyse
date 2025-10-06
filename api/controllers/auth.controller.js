import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { createError } from "../middlewares/errorHandlerMiddleware.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const register = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return next(createError(400, "All fields are required"));
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (existingUser) {
    return next(createError(400, "Hold up, user already exists!"));
  }

  const hash = bcrypt.hashSync(req.body.password, 5);
  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(201).send("User registered successfully.");
});

// login user
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(400, "Email and password are required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(404, "User not found"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createError(404, "Invalid credentials"));
  }

  // generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  // send response
  res.status(200).json({
    token,
    user: { id: user._id, username: user.username, email: user.email },
  });
});

// logout user
export const logout = asyncHandler(async (req, res) => {
  // TODO: Implement logout logic

  res.status(200).json({ message: "User logged out successfully" });
});

// lock user for 10 minutes from signing in if too many failed login attempts
export const lockUser = asyncHandler(async (req, res) => {
  // TODO: Implement lock user logic
  res.status(200).json({ message: "User locked successfully" });
});
