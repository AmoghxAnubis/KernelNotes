// frontend/src/components/EntryForm.tsx
"use client";

import { useState, FormEvent } from "react";
import type { JournalEntry, Mood } from "@/types/journal";
import { createEntryApi } from "@/lib/api";

interface EntryFormProps {
  onCreated: (entry: JournalEntry) => void;
}

const moods: Mood[] = ["productive", "meh", "tired", "chaotic"];

export default function EntryForm({ onCreated }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood>("productive");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const entry = await createEntryApi({ title, content, mood, tags });
      onCreated(entry);
      setTitle("");
      setContent("");
      setTags("");
      setMood("productive");
    } catch (err) {
      console.error(err);
      alert("Failed to create entry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Log a new kernel</h2>
        <p>Capture what you hacked on, how it felt, and what’s next.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>Title</label>
          <input
            placeholder="Refactored auth flow, crushed 3 bugs..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Tags</label>
          <input
            placeholder="backend, auth, bugfix"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Mood</label>
          <div className="mood-row">
            {moods.map((m) => (
              <button
                type="button"
                key={m}
                className={`mood-pill ${m === mood ? "active" : ""} mood-${m}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="field">
        <label>Raw brain dump</label>
        <textarea
          rows={5}
          placeholder="What did you ship? What broke? What did you learn?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="form-footer">
        <button type="submit" disabled={loading}>
          {loading ? "Committing..." : "Commit entry"}
        </button>
        <span className="hint">
          Pro tip: keep it honest, not polished. This is your inner kernel log.
        </span>
      </div>
    </form>
  );
}
