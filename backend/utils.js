const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret"
    );
    req.user = decode; // Assuming decode has the correct structure
    next();
  } else {
    res.status(401).json({ message: "No Token" });
  }
};

module.exports = { generateToken, isAuth };
