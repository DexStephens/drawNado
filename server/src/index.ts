import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const PORT = process.env.PORT;

// Create an HTTP server with express app
const server = http.createServer(app);

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Sample Socket.io event
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// POTENTIAL DESIGN PATTERNS: Facade
