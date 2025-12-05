import { JournalEntry } from "@/types/journal";

export function calculateStreak(entries: JournalEntry[]): number {
  if (!entries.length) return 0;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  let streak = 1;
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].createdAt);
    const curr = new Date(sorted[i].createdAt);

    const diff = prev.getTime() - curr.getTime();

    if (diff <= oneDay + 2000) streak++; // allow slight TS drift
    else break;
  }

  return streak;
}
