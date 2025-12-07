import React, { useEffect, useRef } from "react";
import type { Agency } from "./types";

export default function AgenciesTable({
  agencies,
  selectedAgencyId,
  onSelectAgency,
}: {
  agencies: Agency[];
  selectedAgencyId?: string | null;
  onSelectAgency?: (agencyId: string) => void;
}) {
  const refs = useRef<Record<string, HTMLTableRowElement | null>>({});

  useEffect(() => {
    if (selectedAgencyId) {
      const el = refs.current[selectedAgencyId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedAgencyId]);

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
      <h4 className="font-semibold mb-3">Agences</h4>
      <div className="overflow-auto max-h-[420px]">
        <table className="w-full text-left text-sm">
          <thead className="text-[hsl(var(--fiducial-grey))]">
            <tr>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Nom</th>
              <th className="py-2 px-3">Ville</th>
              <th className="py-2 px-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((a) => (
              <tr
                key={a.id}
                ref={(el) => (refs.current[a.id] = el)}
                onClick={() => onSelectAgency && onSelectAgency(a.id)}
                className={`border-t border-border hover:bg-gray-50 cursor-pointer ${selectedAgencyId === a.id ? "bg-[#EAF3FF]" : ""}`}
              >
                <td className="py-2 px-3">{a.id}</td>
                <td className="py-2 px-3">{a.name}</td>
                <td className="py-2 px-3">{a.city}</td>
                <td className="py-2 px-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
