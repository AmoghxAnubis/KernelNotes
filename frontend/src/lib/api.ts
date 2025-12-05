// frontend/src/lib/api.ts
import type { JournalEntry } from "@/types/journal";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const ENTRIES_URL = `${API_BASE}/api/entries`;

export async function fetchEntries(): Promise<JournalEntry[]> {
  const res = await fetch(ENTRIES_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
}

export async function createEntryApi(input: {
  title: string;
  content: string;
  mood: JournalEntry["mood"];
  tags: string;
}): Promise<JournalEntry> {
  const res = await fetch(ENTRIES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
}

export async function deleteEntryApi(id: string): Promise<void> {
  const res = await fetch(`${ENTRIES_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete entry");
}
