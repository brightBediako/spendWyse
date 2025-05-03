const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  // console.log(req.headers);

  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const jwtPayload = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);

    req.user = jwtPayload;
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: "Unauthorized",
    });
    return;
  }

  next();
};

module.exports = auth;
