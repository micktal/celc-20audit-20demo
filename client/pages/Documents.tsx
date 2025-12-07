import React, { useState } from "react";
import SidebarNav from "@/components/app/Sidebar";

type Doc = { id: string; name: string; category: string; date: string; version: string };

const sample: Doc[] = [
  { id: "1", name: "Plan de sécurité.pdf", category: "Documents fournis par la CELC", date: "2025-03-01", version: "v1" },
  { id: "2", name: "Checklist audit.docx", category: "Documents collectés lors des audits", date: "2025-03-03", version: "v2" },
  { id: "3", name: "Rapport intermédiaire.pdf", category: "Livrables intermédiaires", date: "2025-03-10", version: "v0.1" },
];

export default function Documents() {
  const [docs] = useState<Doc[]>(sample);

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Documents</h2>
              <p className="text-sm text-[hsl(var(--fiducial-grey))]">Repository sécurisé</p>
            </div>
            <div>
              <button className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white">Téléverser</button>
            </div>
          </header>

          <section className="grid gap-6">
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Documents fournis par la CELC</h3>
              <p className="text-sm text-[hsl(var(--fiducial-grey))] mt-2">Documents partagés par le client.</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Table des documents</h3>
              <div className="mt-4 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[hsl(var(--fiducial-grey))]">
                    <tr>
                      <th className="py-2 px-3">Nom</th>
                      <th className="py-2 px-3">Catégorie</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Version</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((d) => (
                      <tr key={d.id} className="border-t border-border">
                        <td className="py-2 px-3">{d.name}</td>
                        <td className="py-2 px-3">{d.category}</td>
                        <td className="py-2 px-3">{d.date}</td>
                        <td className="py-2 px-3">{d.version}</td>
                        <td className="py-2 px-3">
                          <button className="text-sm text-[hsl(var(--bg))]">Télécharger</button>
                        </td>
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
