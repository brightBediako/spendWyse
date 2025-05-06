require("express-async-errors");
const express = require("express");
const cors = require("cors");

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
app.use(cors());
app.use(express.json());

// Models...
require("./models/users");
require("./models/transactions");

// Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);


// 404 handler
app.all("*", (req, res, next) => {
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
