import jsPDF from "jspdf";
import type { JournalEntry } from "@/types/journal";

export function exportEntries(entries: JournalEntry[]) {
  const pdf = new jsPDF();
  let y = 20;

  pdf.setFontSize(18);
  pdf.text("KernelNotes Export", 10, 10);

  entries.forEach((e) => {
    pdf.setFontSize(14);
    pdf.text(e.title, 10, y);
    y += 6;

    pdf.setFontSize(10);
    pdf.text(`Mood: ${e.mood} • Tags: ${e.tags.join(", ")}`, 10, y);
    y += 6;

    pdf.text(e.content, 10, y);
    y += 12;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
  });

  pdf.save("kernelnotes.pdf");
}
