import React from "react";
import SidebarNav from "@/components/app/Sidebar";

const items = [
  {
    id: 1,
    title: "Rapport d'audit SPB",
    desc: "Diagnostic complet SPB – CELC – Version intermédiaire",
  },
  {
    id: 2,
    title: "Analyse PRISCOP consolidée",
    desc: "Contrôles permanents N1 / N2 – Évaluation de la robustesse",
  },
  {
    id: 3,
    title: "Matrice de risques SPB",
    desc: "Criticité – Probabilité – Capacité de détection",
  },
  {
    id: 4,
    title: "Fiches d'écarts et preuves associées",
    desc: "SPB Findings Set – v0.9",
  },
  {
    id: 5,
    title: "Plan d'amélioration H0 / H1 / H2",
    desc: "Roadmap SPB – CELC – Version de travail",
  },
  {
    id: 6,
    title: "Synthèse managériale",
    desc: "Résumé exécutif – à destination du Directoire",
  },
];

export default function Livrables() {
  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Livrables Finaux</h2>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">
              Téléchargements centralisés
            </p>
          </header>

          <div className="grid gap-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="bg-white p-4 rounded-lg border border-border flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-[hsl(var(--fiducial-grey))]">
                    {it.desc}
                  </div>
                </div>
                <div>
                  <button className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white text-sm">
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
