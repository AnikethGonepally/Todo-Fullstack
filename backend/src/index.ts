import express from "express";
import cors from "cors";
import { env } from "./env";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import { prisma } from "./prisma";

const app = express();
app.use(cors());
app.use(express.json());

// Test MongoDB Connection
async function testDB() {
  try {
    await prisma.user.findMany();
    console.log("✅ MongoDB Atlas Connected (Prisma is working)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

testDB();

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get("/", (_, res) => {
  res.send("Backend Running Successfully!");
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
