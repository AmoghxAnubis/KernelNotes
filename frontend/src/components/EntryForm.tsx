"use client";

import { useState, FormEvent } from "react";
import type { JournalEntry, Mood } from "@/types/journal";
import { createEntryApi } from "@/lib/api";
import { generateTags } from "@/lib/aiTags";

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
  const [aiLoading, setAiLoading] = useState(false);

  async function fillTagsWithAI() {
    if (!content.trim() || aiLoading) return;

    setAiLoading(true);
    try {
      const result = await generateTags(content);
      if (result.length) {
        setTags(result.join(", "));
      }
    } finally {
      setAiLoading(false);
    }
  }

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
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = title.trim() && content.trim();

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Log a new kernel</h2>

      <div className="field">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you ship?"
        />
      </div>

      <div className="field">
        <label>Tags</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="backend, react, api"
          />
          <button
            type="button"
            className="ai-button"
            onClick={fillTagsWithAI}
            disabled={aiLoading || !content.trim()}
          >
            {aiLoading ? "Tagging..." : "⚡ AI"}
          </button>
        </div>
      </div>

      <div className="field">
        <label>Mood</label>
        <div className="mood-row">
          {moods.map((m) => (
            <button
              type="button"
              key={m}
              className={`mood-pill ${m === mood ? "active" : ""}`}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Raw brain dump (Markdown supported)</label>
        <textarea
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you debug, learn, or break today?"
        />
      </div>

      <button
        type="submit"
        className="commit-button"
        disabled={loading || !canSubmit}
      >
        {loading ? "Committing..." : "Commit entry"}
      </button>
    </form>
  );
}
