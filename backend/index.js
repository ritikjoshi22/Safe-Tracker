const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const WebSocket = require("ws");
const Employee = require("./model/employeeModel");
const { userRouter } = require("./routers/userRouters");
const cors = require("cors");
const {employeeRouter} = require("./routers/employeeRouters")

const app = express();

// Middleware to handle CORS for frontend at port 5173
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use('/images', express.static('public/images'));

// Middleware to parse JSON data
app.use(express.json());

// Create HTTP server for WebSocket integration
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/safe_track")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define API routes
app.use('/api/users', userRouter);
app.use('/api/employees', employeeRouter);

// WebSocket connection for live location updates
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Listen for location updates from entities
  ws.on("message", async (data) => {
    try {
      const locationData = JSON.parse(data);

      // Update location in the database
      await Employee.findByIdAndUpdate(
        locationData._id,
        { location: { type: "Point", coordinates: [locationData.longitude, locationData.latitude] } },
        { new: true }
      );

      // Emit updated location data to all connected clients
      wss.clients.forEach(async (client) => {
        if (client.readyState === WebSocket.OPEN) {
          await client.send(JSON.stringify(locationData));
        }
      });
    } catch (error) {
      console.error("Error handling WebSocket message:", error);
    }
  });
});

// Start server
server.listen(3000, () => console.log("Server running on http://localhost:3000"));
