// frontend/src/components/EntryCard.tsx
"use client";

import type { JournalEntry } from "@/types/journal";

interface EntryCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

const moodEmoji: Record<JournalEntry["mood"], string> = {
  productive: "⚡",
  meh: "😐",
  tired: "🥱",
  chaotic: "🌀",
};

export default function EntryCard({ entry, onDelete }: EntryCardProps) {
  const created = new Date(entry.createdAt);

  const formattedDate = created.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="card entry-card">
      <header className="entry-header">
        <div>
          <h3>{entry.title}</h3>
          <div className="entry-meta">
            <span className="entry-date">{formattedDate}</span>
            <span className={`mood-pill mood-${entry.mood}`}>
              <span className="mood-emoji">
                {moodEmoji[entry.mood]}&nbsp;
              </span>
              {entry.mood}
            </span>
          </div>
        </div>
        <button
          className="ghost-icon-button"
          onClick={() => onDelete(entry._id)}
          aria-label="Delete entry"
        >
          ×
        </button>
      </header>

      <p className="entry-content">{entry.content}</p>

      {entry.tags?.length > 0 && (
        <div className="tag-row">
          {entry.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
