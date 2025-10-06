import express from "express";
import dotenv from "dotenv";

import authRoute from "../routes/auth.route.js";
import userRoute from "../routes/user.route.js";
import categoryRoute from "../routes/category.route.js";
import transactionRoute from "../routes/transaction.route.js";

import cors from "cors";
import dbConfig from "../config/dbConfig.js";
import {
  globalErrhandler,
  notFound,
} from "../middlewares/errorHandlerMiddleware.js";

dotenv.config();
//db connect
dbConfig();
const app = express();

//cors configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies to be sent
};

// pass incoming data
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom routes
app.use("/api/auth", authRoute);
app.use("/api/profile", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/transactions", transactionRoute);

// error handler and not found middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
