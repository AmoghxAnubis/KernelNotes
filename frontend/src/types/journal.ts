// frontend/src/types/journal.ts
export type Mood = "productive" | "meh" | "tired" | "chaotic";

export interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood: Mood;
  tags: string[];
  createdAt: string; // ISO string from backend
}
