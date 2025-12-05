"use client";

import ReactMarkdown from "react-markdown";
import type { JournalEntry } from "@/types/journal";

interface EntryCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

const moodEmoji = {
  productive: "⚡",
  meh: "😐",
  tired: "🥱",
  chaotic: "🌀",
};

export default function EntryCard({ entry, onDelete }: EntryCardProps) {
  const created = new Date(entry.createdAt).toLocaleString();

  return (
    <article className="card entry-card">
      <header className="entry-header">
        <div>
          <h3>{entry.title}</h3>
          <p className="entry-meta">
            {created} • {moodEmoji[entry.mood]} {entry.mood}
          </p>
        </div>

        <button
          className="ghost-icon-button"
          onClick={() => onDelete(entry._id)}
        >
          ×
        </button>
      </header>

      <div className="entry-content">
        <ReactMarkdown>{entry.content}</ReactMarkdown>
      </div>

      {entry.tags.length > 0 && (
        <div className="tag-row">
          {entry.tags.map((t) => (
            <span className="tag-pill" key={t}>
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
