const express = require("express");
const asyncHandler =  require("express-async-handler");
const bcrypt = require("bcryptjs");
const Employee = require("../model/employeeModel");
const { generateToken } = require("../utils");

const employeeRouter = express.Router();

employeeRouter.post(
  '/add',
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, address, serviceType, password } = req.body;
    
    if (!password) {
      res.status(400).send({ message: 'Password is required' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(req.body.password); // This should show the password or reveal if it's undefined
    const newEmployee = new Employee({
      name,
      phoneNumber,
      address,
      serviceType,
      password: hashedPassword,
    });

    const employee = await newEmployee.save();
    res.send(employee);
  })
);

  
module.exports = {employeeRouter}