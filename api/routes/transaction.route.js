import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const transactionRouter = express.Router();

transactionRouter.post("/create-transaction", isAuthenticated, createTransaction);
transactionRouter.get("/", isAuthenticated, getTransactions);
transactionRouter.put("/:id", isAuthenticated, updateTransaction);
transactionRouter.delete("/:id", isAuthenticated, deleteTransaction);

export default transactionRouter;
