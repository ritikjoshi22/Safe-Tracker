const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const Employee = require("./model/employeeModel");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/safe_track")
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Serve the frontend
app.get("/", (req, res) => {
  res.render("index");
});

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Listen for location updates from entities
  ws.on("message", async (data) => {
    const locationData = JSON.parse(data);
    
    // Update location in the database
    await Employee.findByIdAndUpdate(
      locationData.id,
      { location: { type: "Point", coordinates: [locationData.longitude, locationData.latitude] } },
      { new: true }
    );

    // Emit updated location data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(locationData));
      }
    });
  });
});

// Start server
server.listen(3000, () => console.log("Server running on http://localhost:3000"));