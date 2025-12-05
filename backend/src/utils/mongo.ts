// backend/src/utils/mongo.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  // Return cached DB if already connected
  if (db) return db;

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ Missing MONGO_URI in .env");
  }

  // Create client and connect
  client = new MongoClient(uri);
  await client.connect();

  db = client.db("kernelnote");
  console.log("✅ Connected to MongoDB");

  return db;
}
