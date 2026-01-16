// src/utils.ts

export const formatDateForFilename = (date: Date): string => {
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${yy}-${mm}-${dd}-${hh}-${mi}`;
};

export const downloadCSV = (content: string, filename: string) => {
  // Přidáme BOM (\uFEFF) pro správné zobrazení UTF-8 v Excelu
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const triggerHaptic = () => {
  // Kontrola podpory prohlížečem
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    // 15ms je velmi krátká, "crisp" vibrace (jako klepnutí)
    console.log("Vibrace triggered");
    navigator.vibrate(15);
  }else {
  console.log("Vibrace not supported?" );
  }
};