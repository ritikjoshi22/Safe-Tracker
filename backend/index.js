const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const {Server} = require("socket.io");
const { userRouter } = require("./routers/userRouters");
const cors = require("cors");
const { employeeRouter } = require("./routers/employeeRouters");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to handle CORS for frontend at port 5173
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/safe_track")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

  let clients = {};

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
  
    // Listen for user/employee identification event
    socket.on("identify", ({ role, id, name }) => {
      // Store the client info (role can be 'user' or 'employee')
      clients[socket.id] = { id, role, name };
      console.log(`Client identified: ${role} - ${name} (ID: ${id})`);
  
      // Broadcast updated client list to all connected clients
      io.emit("update-clients", Object.values(clients));
    });
  
    // Handle location update
    socket.on("send-location", (data) => {
      // Broadcast location to all connected clients
      io.emit("receive-location", { id: clients[socket.id]?.id, ...data });
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      delete clients[socket.id];
  
      // Notify all clients about the disconnected user/employee
      io.emit("update-clients", Object.values(clients));
    });
  });

// Define API routes
app.use("/api/users", userRouter);
app.use("/api/employees", employeeRouter);

// Start server
server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
