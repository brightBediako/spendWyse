import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";

import dbConfig from "../config/dbConfig.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";

dotenv.config();
//db connect
dbConfig();
const app = express();

//cors
app.use(cors());

// pass incoming data
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SpendWyse API is running",
    timestamp: new Date().toISOString(),
  });
});

// custom routes

// error middleware
// not found middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
