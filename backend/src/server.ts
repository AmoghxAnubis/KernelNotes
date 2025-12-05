// backend/src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import entriesRouter from "./routes/entries";

// 🔥 Explicitly load backend/.env using an absolute path
const envPath = path.join(__dirname, "..", ".env");
dotenv.config({ path: envPath });

console.log("ENV DEBUG MONGO_URI =>", process.env.MONGO_URI);

const app = express();

// Make sure PORT is a number
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/entries", entriesRouter);

app.listen(PORT, () => {
  console.log(`KernelNotes backend running on http://localhost:${PORT}`);
});
