// backend/src/models/JournalEntry.ts
import type { ObjectId } from "mongodb";

export type Mood = "productive" | "meh" | "tired" | "chaotic";

export interface JournalEntry {
  _id?: ObjectId;       // Mongo ObjectId
  title: string;
  content: string;
  mood: Mood;
  tags: string[];
  createdAt: string;    // ISO string
}
