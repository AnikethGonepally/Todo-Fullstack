import express from "express";
import cors from "cors";
import { env } from "./env";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// Serve static frontend build
app.use(express.static(path.join(__dirname, "frontend")));

// SPA Fallback — important for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
