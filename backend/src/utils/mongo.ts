import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "";
let client: MongoClient;
let db: Db;

export async function connectDB() {
  if (db) return db;

  if (!uri) {
    throw new Error("❌ Missing MONGO_URI in .env");
  }

  client = new MongoClient(uri);

  await client.connect();
  db = client.db("kernelnote");

  console.log("✅ Connected to MongoDB");
  return db;
}
