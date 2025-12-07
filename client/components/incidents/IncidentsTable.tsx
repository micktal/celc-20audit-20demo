import React, { useEffect, useState } from "react";
import { useFilters } from "@/state/filters";

type Incident = {
  id: string;
  date: string;
  heure: string;
  type: string;
  criticite: string;
  agenceId: string;
  agenceNom: string;
  ville: string;
  description: string;
  severiteScore: number;
};

export default function IncidentsTable() {
  const filters = useFilters();
  const [data, setData] = useState<Incident[]>([]);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_detail.json")
      .then((r) => r.json())
      .then((items: Incident[]) => {
        if (!mounted) return;
        let filtered = items.slice();
        // period
        const now = new Date();
        const periodDays = filters.period === "30j" ? 30 : filters.period === "90j" ? 90 : filters.period === "180j" ? 180 : 365;
        const cutoff = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
        filtered = filtered.filter((it) => new Date(it.date) >= cutoff);

        if (filters.agencyId) filtered = filtered.filter((it) => it.agenceId === filters.agencyId);
        if (filters.criticity !== "All") filtered = filtered.filter((it) => it.criticite === filters.criticity);
        if (filters.typologie !== "All") filtered = filtered.filter((it) => it.type === filters.typologie);

        setData(filtered);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [filters.period, filters.agencyId, filters.criticity, filters.typologie]);

  const sortBy = (field: string) => {
    if (field === sortField) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = data.slice().sort((a, b) => {
    let res = 0;
    if (sortField === "date") res = new Date(a.date).getTime() - new Date(b.date).getTime();
    else if (sortField === "criticite") res = a.criticite.localeCompare(b.criticite);
    else if (sortField === "type") res = a.type.localeCompare(b.type);
    return sortDir === "asc" ? res : -res;
  });

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
      <h3 className="font-semibold mb-3">Détails des incidents</h3>
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[hsl(var(--fiducial-grey))]">
            <tr>
              <th className="py-2 px-3 cursor-pointer" onClick={() => sortBy("date")}>Date</th>
              <th className="py-2 px-3">Heure</th>
              <th className="py-2 px-3">Agence</th>
              <th className="py-2 px-3">Ville</th>
              <th className="py-2 px-3 cursor-pointer" onClick={() => sortBy("type")}>Type</th>
              <th className="py-2 px-3 cursor-pointer" onClick={() => sortBy("criticite")}>Criticité</th>
              <th className="py-2 px-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((it) => (
              <tr key={it.id} className="border-t border-border hover:bg-gray-50 cursor-pointer" onClick={() => filters.setAgency(it.agenceId)}>
                <td className="py-2 px-3">{it.date}</td>
                <td className="py-2 px-3">{it.heure}</td>
                <td className="py-2 px-3">{it.agenceNom}</td>
                <td className="py-2 px-3">{it.ville}</td>
                <td className="py-2 px-3">{it.type}</td>
                <td className="py-2 px-3">{it.criticite}</td>
                <td className="py-2 px-3" title={it.description}>{it.description.length > 80 ? it.description.slice(0, 77) + '...' : it.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
