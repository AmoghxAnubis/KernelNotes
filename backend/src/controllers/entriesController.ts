// backend/src/controllers/entriesController.ts
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectDB } from "../utils/mongo";
import { JournalEntry } from "../models/JournalEntry";

export const getEntries = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const collection = db.collection<JournalEntry>("entries");

    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};

export const createEntry = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const collection = db.collection<JournalEntry>("entries");

    // Strictly type request body
    const { title, content, mood, tags } = req.body as {
      title: string;
      content: string;
      mood: JournalEntry["mood"];
      tags?: string[] | string;
    };

    // Normalize tags (string | array | undefined → array)
    const normalizedTags: string[] = Array.isArray(tags)
      ? tags.map((t) => t.trim())
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const entry: JournalEntry = {
      title,
      content,
      mood,
      tags: normalizedTags,
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(entry);

    res.status(201).json({ ...entry, _id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const collection = db.collection<JournalEntry>("entries");

    const id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(id) });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete entry" });
  }
};
