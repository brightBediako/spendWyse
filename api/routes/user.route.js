import express from "express";
import {
  profile,
  changePassword,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.get("/", isAuthenticated, profile);
userRouter.put("/change-password", isAuthenticated, changePassword);
userRouter.put("/update-profile", isAuthenticated, updateProfile);
userRouter.delete("/delete/:id", isAuthenticated, deleteProfile);

export default userRouter;
