import React from "react";
import SidebarNav from "@/components/app/Sidebar";

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
            <div>
              <button className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white">Téléverser</button>
            </div>
          </header>

          <section className="grid gap-6">
            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Documents fournis par la CELC</h3>
              <div className="mt-4 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[hsl(var(--fiducial-grey))]">
                    <tr>
                      <th className="py-2 px-3">Document</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Version</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fournis.map((d) => (
                      <tr key={d.id} className="border-t border-border hover:bg-gray-50">
                        <td className="py-2 px-3">{d.name}</td>
                        <td className="py-2 px-3">{d.type}</td>
                        <td className="py-2 px-3">{d.version}</td>
                        <td className="py-2 px-3">{d.date}</td>
                        <td className="py-2 px-3"><button className="text-sm text-[hsl(var(--bg))]">Télécharger</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Documents collectés lors des audits</h3>
              <div className="mt-4 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[hsl(var(--fiducial-grey))]">
                    <tr>
                      <th className="py-2 px-3">Document</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Site</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectes.map((d) => (
                      <tr key={d.id} className="border-t border-border hover:bg-gray-50">
                        <td className="py-2 px-3">{d.name}</td>
                        <td className="py-2 px-3">{d.type}</td>
                        <td className="py-2 px-3">{d.site}</td>
                        <td className="py-2 px-3">{d.date}</td>
                        <td className="py-2 px-3"><button className="text-sm text-[hsl(var(--bg))]">Télécharger</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">Livrables intermédiaires</h3>
              <div className="mt-4 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[hsl(var(--fiducial-grey))]">
                    <tr>
                      <th className="py-2 px-3">Document</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Statut</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interm.map((d) => (
                      <tr key={d.id} className="border-t border-border hover:bg-gray-50">
                        <td className="py-2 px-3">{d.name}</td>
                        <td className="py-2 px-3">{d.type}</td>
                        <td className="py-2 px-3">{d.status}</td>
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
