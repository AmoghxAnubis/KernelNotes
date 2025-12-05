"use client";

import { useMemo, useState } from "react";
import EntryCard from "./EntryCard";
import type { JournalEntry, Mood } from "@/types/journal";

interface Props {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: Props) {
  const [filter, setFilter] = useState<Mood | "all">("all");
  const [search, setSearch] = useState("");

  const suggestions = search
    ? entries
        .flatMap((e) => [e.title, ...e.tags])
        .filter((v) => v.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 5)
    : [];

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (filter !== "all" && e.mood !== filter) return false;
      if (!search.trim()) return true;

      const s = search.toLowerCase();

      return (
        e.title.toLowerCase().includes(s) ||
        e.content.toLowerCase().includes(s) ||
        e.tags.some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [entries, filter, search]);

  return (
    <div className="entry-list-container">
      <input
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className="autocomplete-box">
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="autocomplete-item"
              onClick={() => setSearch(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      <div className="entries-grid">
        {filtered.map((e) => (
          <EntryCard key={e._id} entry={e} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
