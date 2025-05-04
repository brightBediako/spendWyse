const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../../middleware/auth"); // Importing the auth middleware
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");

const userRoutes = express.Router();

// Routes...
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpwd", forgotPassword);
userRoutes.post("/resetpwd", resetPassword);

 // Middleware to protect the routes
userRoutes.use(auth);

// protected routes
userRoutes.get("/dashboard", userDashboard);


module.exports = userRoutes;
