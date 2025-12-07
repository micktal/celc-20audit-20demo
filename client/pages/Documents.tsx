import React, { useMemo, useState } from "react";
import SidebarNav from "@/components/app/Sidebar";
import { downloadCSV } from "@/lib/utils";

const fournis = [
  { id: "f1", name: "Cartographie SPB 2024", type: "PDF", version: "v1.0", date: "15/02/2025" },
  { id: "f2", name: "DUERP – Siège", type: "PDF", version: "v2.1", date: "03/02/2025" },
  { id: "f3", name: "Procédure Incivilités", type: "PDF", version: "v1.4", date: "18/01/2025" },
  { id: "f4", name: "PRISCOP N1 – Janvier", type: "XLS", version: "v1.0", date: "05/02/2025" },
];

const collectes = [
  { id: "c1", name: "Plan d’implantation – Agence A", type: "PDF", site: "Agence A", date: "20/02/2025" },
  { id: "c2", name: "Registre incidents 2024", type: "XLS", site: "Agence B", date: "22/02/2025" },
  { id: "c3", name: "Photos angles morts", type: "PNG", site: "Agence C", date: "24/02/2025" },
  { id: "c4", name: "Check-list SSI", type: "PDF", site: "Agence D", date: "25/02/2025" },
];

const interm = [
  { id: "i1", name: "Synthèse d’étape SPB", type: "PDF", status: "Publié", date: "26/02/2025" },
  { id: "i2", name: "État d’avancement PRISCOP", type: "PDF", status: "Publié", date: "27/02/2025" },
  { id: "i3", name: "Note incidents & signaux faibles", type: "PDF", status: "En revue", date: "28/02/2025" },
];

export default function Documents() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const allDocs = useMemo(() => {
    return [
      ...fournis.map((d) => ({ section: "fourni", ...d })),
      ...collectes.map((d) => ({ section: "collecte", ...d })),
      ...interm.map((d) => ({ section: "interm", ...d })),
    ];
  }, []);

  const filtered = useMemo(() => {
    return allDocs.filter((d) => {
      if (filter !== "all" && d.section !== filter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return Object.values(d).join(" ").toLowerCase().includes(s);
    });
  }, [allDocs, filter, q]);

  const exportAll = () => {
    const rows = filtered.map((r: any) => ({ Section: r.section, Name: r.name, Type: r.type || r.version || "", Date: r.date || "", Site: r.site || "", Version: r.version || "", Status: r.status || "" }));
    downloadCSV("documents_export.csv", rows);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Documents</h2>
              <p className="text-sm text-[hsl(var(--fiducial-grey))]">Repository sécurisé — structuré par source</p>
            </div>
            <div className="flex items-center gap-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="rounded-md border border-border p-2" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border border-border p-2">
                <option value="all">Tous</option>
                <option value="fourni">Fournis par la CELC</option>
                <option value="collecte">Collectés lors des audits</option>
                <option value="interm">Livrables intermédiaires</option>
              </select>
              <button onClick={exportAll} className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white">Exporter CSV</button>
              <button className="px-3 py-2 rounded-md bg-white border border-border">Téléverser</button>
            </div>
          </header>

          <section className="grid gap-6">
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Résultats</h3>
              <div className="mt-4 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[hsl(var(--fiducial-grey))]">
                    <tr>
                      <th className="py-2 px-3">Section</th>
                      <th className="py-2 px-3">Document</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Site / Version</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d: any) => (
                      <tr key={`${d.section}-${d.id}`} className="border-t border-border hover:bg-gray-50">
                        <td className="py-2 px-3">{d.section}</td>
                        <td className="py-2 px-3">{d.name}</td>
                        <td className="py-2 px-3">{d.type || d.version}</td>
                        <td className="py-2 px-3">{(d as any).site || (d as any).version || "-"}</td>
                        <td className="py-2 px-3">{d.date}</td>
                        <td className="py-2 px-3"><button className="text-sm text-[hsl(var(--bg))]">Télécharger</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
