import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});

export const login = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});

// lock user for 10 minutes from signing in if too many failed login attempts
export const lockUser = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});
