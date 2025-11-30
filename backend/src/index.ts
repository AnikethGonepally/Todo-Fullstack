import express from "express";
import cors from "cors";
import { env } from "./env";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// Serve frontend build (React)
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server started at http://localhost:${env.PORT}`);
});
