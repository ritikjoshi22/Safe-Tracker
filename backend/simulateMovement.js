const WebSocket = require("ws");
const mongoose = require("mongoose");
const Employee = require("./model/employeeModel");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/safe_track");

// Establish WebSocket connection
const ws = new WebSocket("ws://localhost:3000");
ws.on("error", (error) => {
  console.error("WebSocket error in simulation:", error);
});

// Generate random coordinates near a base location
function getRandomCoordinates(baseLat, baseLng, radius = 0.1) {
  const randomLat = baseLat + (Math.random() - 0.5) * radius;
  const randomLng = baseLng + (Math.random() - 0.5) * radius;
  return { latitude: randomLat, longitude: randomLng };
}

// Simulate movement for each entity
async function simulateMovement(entityId, type) {
  const baseLocation = { latitude: 28.3949, longitude: 84.1240 }; // Replace with desired center coordinates

  setInterval(async () => {
    // Get random nearby coordinates
    const newCoords = getRandomCoordinates(baseLocation.latitude, baseLocation.longitude);

    // Update location in MongoDB
    await Employee.findByIdAndUpdate(entityId, {
      location: { type: "Point", coordinates: [newCoords.longitude, newCoords.latitude] }
    });

    // Send the updated location to WebSocket clients
    const locationData = { id: entityId, type, latitude: newCoords.latitude, longitude: newCoords.longitude };
    ws.send(JSON.stringify(locationData));
  }, 10000); // Adjust interval as needed
}

// Run simulation for each entity

const entityId = "671e4ff3c4ef15ae8c918979";
const entityId2 = "671e4ff3c4ef15ae8c91897c";
simulateMovement(entityId, "fire_brigade");
simulateMovement(entityId2, "fire_brigade");