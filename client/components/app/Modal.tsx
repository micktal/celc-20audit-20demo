import React from "react";

export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children?: React.ReactNode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[min(900px,95%)] bg-white rounded-lg shadow-lg border border-border">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-sm text-[hsl(var(--fiducial-grey))]" onClick={onClose}>Fermer</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
