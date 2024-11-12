const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Employee = require("../model/employeeModel");
const { generateToken } = require("../utils");

const employeeRouter = express.Router();

employeeRouter.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, address, email, serviceType, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400).send({ message: "Name, Email, and Password are required" });
      return;
    }

    // Check for existing employee
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      res.status(400).send({ message: "Employee with this email already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newEmployee = new Employee({
      name,
      phoneNumber,
      email,
      address,
      serviceType,
      password: hashedPassword,
    });
    console.log("hello");

    // Save new employee
    const employee = await newEmployee.save();
    res.status(201).send(employee);
  })
);

employeeRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const emp = await Employee.findOne({ email: req.body.email });
    if (emp && bcrypt.compareSync(req.body.password, emp.password)) {
      res.json({
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        serviceType: emp.serviceType,
        token: generateToken(emp),
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  })
);

module.exports = { employeeRouter };
