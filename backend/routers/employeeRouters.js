const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Employee = require("../model/employeeModel");
const { generateToken } = require("../utils");

const employeeRouter = express.Router();

employeeRouter.post(
  "/add",
  asyncHandler(async (req, res) => {
    const employee = await Employee.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      serviceType: req.body.serviceType,
      password: bcrypt.hashSync(req.body.password),
    });
    res.send({
      _id: employee._id,
      name: employee.name,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
      address: employee.address,
      serviceType: employee.serviceType,
      token: generateToken(employee),
    });
  })
);

employeeRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const emp = await Employee.findOne({ email: req.body.email });
    if (emp) {
      if (bcrypt.compareSync(req.body.password, emp.password)) {
        res.json({
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          serviceType: emp.serviceType,
          token: generateToken(emp),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

module.exports = { employeeRouter };
