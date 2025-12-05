// frontend/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { JournalEntry } from "@/types/journal";
import { fetchEntries, deleteEntryApi } from "@/lib/api";
import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load entries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleCreated(entry: JournalEntry) {
    setEntries((prev) => [entry, ...prev]);
  }

  async function handleDelete(id: string) {
    const prev = entries;
    setEntries((e) => e.filter((x) => x._id !== id));
    try {
      await deleteEntryApi(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
      setEntries(prev);
    }
  }

  return (
    <main className="shell">
      <header className="top-bar">
        <div className="brand">
          <span className="brand-orb" />
          <div>
            <h1>KernelNotes</h1>
            <p>Your dev brain, logged like system dmesg.</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="layout-grid">
        <div className="left-column">
          <EntryForm onCreated={handleCreated} />
        </div>

        <div className="right-column">
          {loading ? (
            <div className="card loading-card">
              <div className="spinner" />
              <p>Booting your entries...</p>
            </div>
          ) : (
            <EntryList entries={entries} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </main>
  );
}
