import React from "react";
import SidebarNav from "@/components/app/Sidebar";

const items = [
  { id: 1, title: "Rapport d'audit SPB", desc: "Rapport complet d'audit SPB" },
  { id: 2, title: "Analyse PRISCOP consolidée", desc: "Analyse détaillée des résultats PRISCOP" },
  { id: 3, title: "Matrice de risques", desc: "Matrice des risques et priorisation" },
  { id: 4, title: "Fiches d'écarts exportables", desc: "Export CSV/Excel des fiches d'écarts" },
  { id: 5, title: "Plan d'action HQ", desc: "Plan d'action priorisé et détaillé" },
];

export default function Livrables() {
  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Livrables Finaux</h2>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">Téléchargements centralisés</p>
          </header>

          <div className="grid gap-4">
            {items.map((it) => (
              <div key={it.id} className="bg-white p-4 rounded-lg border border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-[hsl(var(--fiducial-grey))]">{it.desc}</div>
                </div>
                <div>
                  <button className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white text-sm">Télécharger</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
