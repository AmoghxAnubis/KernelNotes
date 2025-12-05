"use client";

import { useEffect, useState } from "react";
import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import ThemeToggle from "@/components/ThemeToggle";
import { fetchEntries, deleteEntryApi } from "@/lib/api";
import type { JournalEntry } from "@/types/journal";
import { calculateStreak } from "@/lib/streak";
import { exportEntries } from "@/lib/exportPdf";

export default function HomePage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetchEntries();
    setEntries(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const streak = calculateStreak(entries);

  return (
    <main className="shell">
      <header className="top-bar">
        <div className="brand">
          <span className="brand-orb" />
          <div>
            <h1>KernelNotes</h1>
            <p>🔥 {streak}-day streak</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="theme-toggle"
            onClick={() => exportEntries(entries)}
          >
            Export PDF
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="layout-grid">
        <div className="left-column">
          <EntryForm
            onCreated={(e) => setEntries((prev) => [e, ...prev])}
          />
        </div>

        <div className="right-column">
          {loading ? (
            <div className="card loading-card">
              <div className="spinner" />
              <p>Loading...</p>
            </div>
          ) : (
            <EntryList
              entries={entries}
              onDelete={async (id) => {
                const prev = entries;
                setEntries(prev.filter((x) => x._id !== id));
                try {
                  await deleteEntryApi(id);
                } catch {
                  setEntries(prev);
                }
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
