import express from "express";
import cors from "cors";
import { env } from "./env";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
  res.send("Backend Running Successfully!");
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
