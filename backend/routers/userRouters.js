const express = require("express");
const asyncHandler =  require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel"); // Ensure the path is correct
const { generateToken } = require("../utils");

const userRouter = express.Router();

userRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
          icon: user.icon,
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      icon: req.body.icon || "/images/pin-map.png",
    });

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      icon: user.icon,
      token: generateToken(user),
    });
  })
);

module.exports = {userRouter}