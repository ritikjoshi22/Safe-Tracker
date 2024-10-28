// employeeModel.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phoneNumber: String,
  address: String,
  serviceType: {
    type: String,
    enum: ["ambulance", "police", "fire_brigade"], // Options for different services
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

employeeSchema.index({ location: "2dsphere" }); // Enable geospatial indexing

module.exports = mongoose.model("Employee", employeeSchema);
