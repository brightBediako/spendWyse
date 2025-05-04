require("express-async-errors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users/users.routes");
const transactionRoutes = require("./modules/users/transactions/transactions.routes");

// connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

// Models...
require("./models/users");
require("./models/transactions");

// Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);


// 404 handler
// This middleware will be called if no other route matches 
app.all("*", (req, res,next) => {
  res.status(404).json({
    status: "fail",
    message: "Not Found",
  });
});

// express-error handler
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started running!");
});
