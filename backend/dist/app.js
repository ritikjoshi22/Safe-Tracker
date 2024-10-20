"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socketio = require("socket.io");
const server = http_1.default.createServer(app);
const io = socketio(server);
app.set("view engine", "ejs");
app.set("views", path_1.default.join("E:\Hackathon\SafeTrack\backend\src\views\index.ejs", "views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
io.on("connection", (socket) => {
    console.log("connected");
});
app.get("/", function (req, res) {
    res.render("index");
});
server.listen(3000);
