import asyncHandler from "express-async-handler";

export const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(users);
});
