const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const channelRoutes = require("./routes/channelRoutes");

const { createMessage } = require("./controllers/messageController");

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the Slack Clone Backend!");
});

app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.use("/api/workspaces/:workspaceId/channels", channelRoutes);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinWorkspace", (workspaceId) => {
    socket.join(workspaceId);
    console.log(`User ${socket.id} joined workspace room: ${workspaceId}`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const savedMessage = await createMessage({
        ...data,
        userId: data.userId,
      });

      if (savedMessage) {
        io.to(data.workspaceId).emit("receiveMessage", savedMessage);
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
