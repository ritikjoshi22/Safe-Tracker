const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address:  {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["ambulance", "police", "fire_brigade"],
    required: true,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt timestamps
});

module.exports = mongoose.model("Employee", employeeSchema);
