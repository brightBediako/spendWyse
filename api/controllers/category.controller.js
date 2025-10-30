import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";
import asyncHandler from "express-async-handler";
import { createError } from "../middlewares/errorHandlerMiddleware.js";

// create new category
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return next(createError(400, "All fields are required"));
  }

  // convert name to lowercase
  const normalizedName = name.toLowerCase();

  // check if type is valid
  const validTypes = ["income", "expense"];
  if (!validTypes.includes(type.toLowerCase())) {
    return next(createError(400, "Invalid category type" + type));
  }

  //   check if category already exists for user
  const categoryExists = await Category.findOne({
    user: req.user,
    name: normalizedName,
  });

  if (categoryExists) {
    return next(
      createError(400, `Category ${categoryExists.name} already exists`)
    );
  }

  const category = new Category({
    name: normalizedName,
    type: type.toLowerCase(),
    user: req.user,
  });
  res.status(201).json(await category.save());
});

// get user categories
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ user: req.user });
  res.status(200).json(categories);
});

// update category
export const updateCategory = asyncHandler(async (req, res, next) => {
  // ensure we use the id string not the whole params object
  const categoryId = req.params.id;
  const { name, type } = req.body;

  // normalize name only if provided
  const normalizedName = name ? name.toLowerCase() : null;

  const category = await Category.findById(categoryId);

  if (!category) return next(createError(404, "Category not found!"));
  // req.user is set by auth middleware to the user id (string)
  if (category.user.toString() !== req.user) {
    return next(createError(403, "You can update only your category!"));
  }

  const oldName = category.name;
  // update category properties only when provided and non-empty
  if (
    normalizedName !== undefined &&
    normalizedName !== null &&
    normalizedName !== ""
  )
    category.name = normalizedName;
  if (type !== undefined && type !== "") category.type = type.toLowerCase();

  // check if category with the same name already exists for this user
  if (normalizedName && oldName !== normalizedName) {
    const categoryExists = await Category.findOne({
      user: req.user,
      name: normalizedName,
    });
    if (categoryExists) {
      return next(
        createError(400, `Category ${categoryExists.name} already exists`)
      );
    }
  }

  const updatedCategory = await category.save();
  // update category in transactions when name changed
  if (normalizedName && oldName !== updatedCategory.name) {
    await Transaction.updateMany(
      { user: req.user, category: oldName },
      { $set: { category: updatedCategory.name } }
    );
  }
  res.status(200).json(updatedCategory);
});

// delete category
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(createError(404, "Category not found!"));

  if (category.user.toString() === req.user.toString()) {
    // update transactions with this category
    const defaultCategory = "Uncategorized";
    await Transaction.updateMany(
      { user: req.user, category: category.name },
      { $set: { category: defaultCategory } }
    );
    // delete category
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category has been deleted." });
  } else {
    return next(createError(403, "You can delete only your category!"));
  }
});
