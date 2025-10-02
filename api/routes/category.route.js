import express from "express";
import {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", isAuthenticated, createCategory);
categoryRouter.get("/", isAuthenticated, getCategories);
categoryRouter.put("/:id", isAuthenticated, updateCategory);
categoryRouter.delete("/:id", isAuthenticated, deleteCategory);

export default categoryRouter;
