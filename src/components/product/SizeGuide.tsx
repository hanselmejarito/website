"use client";

import { useEffect } from "react";

const jerseyRows = [
  { size: "S", chest: "40", length: "27" },
  { size: "M", chest: "42", length: "28" },
  { size: "L", chest: "44", length: "29" },
  { size: "XL", chest: "46", length: "30" },
];

const shortsRows = [
  { size: "S", waist: "26–30", length: "18" },
  { size: "M", waist: "28–32", length: "19" },
  { size: "L", waist: "30–34", length: "20" },
  { size: "XL", waist: "32–36", length: "21" },
];

export function SizeGuide({
  type,
  onClose,
}: {
  type: "jersey" | "shorts";
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isJersey = type === "jersey";

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center">
      <div
        className="drawer-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className="search-panel relative w-full max-w-md bg-canvas-white p-6 shadow-[0_40px_80px_-30px_rgba(11,22,34,0.5)] sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Size guide
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink">
              {isJersey ? "Jerseys" : "Shorts"}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close size guide" className="p-2 text-ink">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-chrome-gray-200 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              <th className="pb-3 pr-4 font-semibold">Size</th>
              <th className="pb-3 pr-4 font-semibold">
                {isJersey ? "Chest (in)" : "Waist (in)"}
              </th>
              <th className="pb-3 font-semibold">Length (in)</th>
            </tr>
          </thead>
          <tbody>
            {(isJersey ? jerseyRows : shortsRows).map((row) => (
              <tr key={row.size} className="border-b border-chrome-gray-100">
                <td className="py-3 pr-4 font-semibold text-ink">{row.size}</td>
                <td className="py-3 pr-4 text-ink-muted">
                  {"chest" in row ? row.chest : row.waist}
                </td>
                <td className="py-3 text-ink-muted">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-5 text-xs leading-relaxed text-ink-faint">
          {isJersey
            ? "Race cut runs slightly roomy — size down for a fitted look, stay true for the classic drape."
            : "Elastic waist with drawstring. Size up for a baggier court fit."}
        </p>
      </div>
    </div>
  );
}
