const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {

    const accessToken = jsonwebtoken.sign(
      {
        _id: user._id,
        name: user.name,
        // balance: user.balance,
      },
      process.env.JWT_SECRET
    );

  return accessToken;
};

module.exports = jwtManager;