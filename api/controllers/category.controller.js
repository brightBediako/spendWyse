import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import { createError } from "../middlewares/errorHandlerMiddleware.js";

// create new category
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return next(createError(400, "All fields are required"));
  }
  const newCategory = new Category({
    user: req.user,
    name,
    type,
  });

  //   check if category already exists for user
  const existingCategory = await Category.findOne({
    user: req.user,
    name,
    type,
  });

  if (existingCategory) {
    return next(createError(400, "Category already exists!"));
  }
  const savedCategory = await newCategory.save();
  res.status(201).json(savedCategory);
});

// get user categories
export const getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
});

// update category
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { name, type } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) return next(createError(404, "Category not found!"));
  if (category.userId !== req.userId) {
    return next(createError(403, "You can update only your category!"));
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedCategory);
});

// delete category
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(createError(404, "Category not found!"));

  if (category.userId !== req.userId) {
    return next(createError(403, "You can delete only your category!"));
  }

  await Category.findByIdAndDelete(req.params.id);
  res.status(200).send("Category has been deleted.");
});
