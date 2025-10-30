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

// CORS configuration
// Allow requests from the client origins used in development and production.
const whitelist = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "https://spendwyse.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

// pass incoming data
app.use((req, res, next) => {
  // Use the cors middleware per-request so we can control origin dynamically
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      // Log and forward the error to the global error handler
      console.warn("CORS error:", err.message || err);
      return next(err);
    }
    next();
  });
});
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
