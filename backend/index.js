const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const Employee = require("./model/employeeModel");
const { userRouter } = require("./routers/userRouters")
const cors = require("cors");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
app.use(express.json()); // Middleware to parse JSON data
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
app.use('/api/users',userRouter)

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Listen for location updates from entities
  ws.on("message", async (data) => {
    try {
      const locationData = JSON.parse(data);
    
    // Update location in the database
    await Employee.findByIdAndUpdate(
      locationData.id,
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