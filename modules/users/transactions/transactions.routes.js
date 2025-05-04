const express = require("express");

const auth = require("../../../middleware/auth"); 
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransactions = require("./controllers/deleteTransactions");
const editTransactions = require("./controllers/editTransactions");

const transactionRoutes = express.Router();

// Routes...

 // Middleware to protect the routes
transactionRoutes.use(auth);

// protected routes
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);

transactionRoutes.delete("/:transaction_id", deleteTransactions);
transactionRoutes.patch("/", editTransactions);


module.exports = transactionRoutes;
