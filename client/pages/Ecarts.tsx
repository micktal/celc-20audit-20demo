import React from "react";
import SidebarNav from "@/components/app/Sidebar";

const sample = [
  { id: 1, site: "Site A", ecart: "Porte non verrouillée", criticite: "High", commentaire: "Accès non restreint", statut: "Ouvert" },
  { id: 2, site: "Site B", ecart: "Caméra défectueuse", criticite: "Medium", commentaire: "Remplacer ASAP", statut: "En cours" },
];

export default function Ecarts() {
  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Fiches d'écarts & Observations</h2>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">SPB et PRISCOP - observations techniques et organisationnelles</p>
          </header>

          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="mb-4 text-sm text-[hsl(var(--fiducial-grey))]">Encadré rouge: alertes critiques</div>

            <div className="overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[hsl(var(--fiducial-grey))]">
                  <tr>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Écart</th>
                    <th className="py-2 px-3">Criticité</th>
                    <th className="py-2 px-3">Commentaire</th>
                    <th className="py-2 px-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.map((s) => (
                    <tr key={s.id} className={`border-t ${s.criticite === "High" ? "bg-red-50" : ""}`}>
                      <td className="py-2 px-3">{s.site}</td>
                      <td className="py-2 px-3">{s.ecart}</td>
                      <td className="py-2 px-3">{s.criticite}</td>
                      <td className="py-2 px-3">{s.commentaire}</td>
                      <td className="py-2 px-3">{s.statut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
