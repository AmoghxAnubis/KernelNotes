// frontend/src/components/EntryList.tsx
"use client";

import { useMemo, useState } from "react";
import type { JournalEntry, Mood } from "@/types/journal";
import EntryCard from "./EntryCard";

interface EntryListProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

const moodFilters: (Mood | "all")[] = [
  "all",
  "productive",
  "meh",
  "tired",
  "chaotic",
];

export default function EntryList({ entries, onDelete }: EntryListProps) {
  const [filter, setFilter] = useState<Mood | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (filter !== "all" && entry.mood !== filter) return false;

      if (!search.trim()) return true;

      const needle = search.toLowerCase();
      return (
        entry.title.toLowerCase().includes(needle) ||
        entry.content.toLowerCase().includes(needle) ||
        entry.tags.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [entries, filter, search]);

  const total = entries.length;
  const todayCount = entries.filter((e) => {
    const d = new Date(e.createdAt);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <section className="entries-section">
      <header className="entries-header">
        <div>
          <h2>Recent logs</h2>
          <p>
            {total === 0
              ? "No entries yet. Your kernel is waiting."
              : `${total} entr${total === 1 ? "y" : "ies"} total · ${todayCount} today`}
          </p>
        </div>

        <div className="entries-controls">
          <div className="filter-group">
            {moodFilters.map((m) => (
              <button
                key={m}
                type="button"
                className={`filter-pill ${m === filter ? "active" : ""}`}
                onClick={() => setFilter(m)}
              >
                {m === "all" ? "All moods" : m}
              </button>
            ))}
          </div>

          <input
            className="search-input"
            placeholder="Search title, content, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="entries-grid">
        {filtered.length === 0 ? (
          <div className="card empty-card">
            <p>No entries match this filter yet.</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <EntryCard key={entry._id} entry={entry} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  );
}
