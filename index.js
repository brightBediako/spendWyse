require("express-async-errors");
const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

const errorHandler = require("./handlers/errorHandler");

// connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(errorHandler);
app.use(express.json());

// Models...

// Routes...

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server server is running!");
});
