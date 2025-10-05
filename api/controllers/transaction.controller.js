import Category from "../models/Transaction.js";
import asyncHandler from "express-async-handler";
import { createError } from "../middlewares/errorHandlerMiddleware.js";
import Transaction from "../models/Transaction.js";

// create new category
export const createTransaction = asyncHandler(async (req, res, next) => {
  const { type, category, amount, date, description } = req.body;
  if (!type || !amount || !date) {
    return next(createError(400, "Type, Amount and Date fields are required"));
  }

  // Parse date string to valid Date object (expects YYYY-MM-DD or similar)
  let parsedDate;
  if (typeof date === "string") {
    // Try to parse DD-MM-YY or DD-MM-YYYY
    const parts = date.split("-");
    if (parts.length === 3) {
      // If year is 2 digits, prepend '20'
      let year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
      parsedDate = new Date(`${year}-${parts[1]}-${parts[0]}`);
    } else {
      parsedDate = new Date(date);
    }
  } else {
    parsedDate = date;
  }

  const transaction = new Category({
    user: req.user,
    type,
    category,
    amount,
    date: parsedDate,
    description,
  });

  await transaction.save();
  res
    .status(201)
    .json({ message: "Transaction created successfully", transaction });
});

// get user transactions with filtering and sorting
export const getTransactions = asyncHandler(async (req, res, next) => {
  const { startDate, endDate, type, category } = req.query;
  let filters = { user: req.user };

  if (startDate) {
    filters.date = { ...filters.date, $gte: new Date(startDate) };
  }
  if (endDate) {
    filters.date = { ...filters.date, $lte: new Date(endDate) };
  }
  if (type) {
    filters.category = type;
  }
  if (category) {
    if (category === "All") {
    } else if (category === "Uncategorized") {
      filters.category = "Uncategorized";
    } else {
      filters.category = category;
    }
  }

  const transactions = await Transaction.find(filters).sort({ date: -1 });

  res.status(200).json(transactions);
});

// update category
export const updateTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (transaction.userId !== req.userId) {
    return next(createError(403, "You can update only your transaction!"));
  }
  if (!transaction) return next(createError(404, "Transaction not found!"));

  if (transaction && transaction.user.toString() === req.user.toString()) {
    (transaction.type = req.body.type || transaction.type),
      (transaction.category = req.body.category || transaction.category),
      (transaction.amount = req.body.amount || transaction.amount),
      (transaction.date = req.body.date || transaction.date),
      (transaction.description =
        req.body.description || transaction.description);

    const updatedTransaction = await transaction.save();
    res.status(200).json({
      message: "Transaction has been updated successfully",
      updatedTransaction,
    });
  }
});

// delete transaction
export const deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) return next(createError(404, "Transaction not found!"));

  if (transaction.userId !== req.userId) {
    return next(createError(403, "You can delete only your Transaction!"));
  }

  await Transaction.findByIdAndDelete(req.params.id);
  res.status(200).send("Transaction has been deleted.");
});
