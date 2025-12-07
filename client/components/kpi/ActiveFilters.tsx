import React from "react";
import { useFilters } from "@/state/filters";

export default function ActiveFilters() {
  const filters = useFilters();
  const removeAgency = () => filters.setAgency(null);
  const removeCrit = () => filters.setCriticity("All");
  const removeTypo = () => filters.setTypologie("All");
  const removePeriod = () => filters.setPeriod("30j");

  const items = [] as { label: string; onRemove: () => void }[];
  if (filters.period) items.push({ label: `Période: ${filters.period}`, onRemove: removePeriod });
  if (filters.agencyId) items.push({ label: `Agence: ${filters.agencyId}`, onRemove: removeAgency });
  if (filters.criticity !== "All") items.push({ label: `Criticité: ${filters.criticity}`, onRemove: removeCrit });
  if (filters.typologie !== "All") items.push({ label: `Typologie: ${filters.typologie}`, onRemove: removeTypo });

  if (!items.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((it, idx) => (
        <div key={idx} className="flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1 text-sm">
          <span>{it.label}</span>
          <button onClick={it.onRemove} className="text-xs text-[hsl(var(--fiducial-grey))]">✕</button>
        </div>
      ))}
    </div>
  );
}
