import React from "react";
import SidebarNav from "@/components/app/Sidebar";

const ecarts = [
  {
    id: "001",
    site: "Agence Les Halles",
    titre: "Vidéo hors champ",
    criticite: "Haute",
    ecart: "Caméra entrée secondaire ne couvre pas l’espace distributeur interne.",
    impact: "Risque probatoire en cas d’incident.",
    statut: "Ouvert",
  },
  {
    id: "002",
    site: "Agence République",
    titre: "Posture sécuritaire insuffisante",
    criticite: "Moyenne",
    ecart: "Accueil non conforme à la posture SPB (téléphone + documentation interne visible).",
    statut: "En cours",
  },
  {
    id: "003",
    site: "Agence Saint-Pierre",
    titre: "Porte arrière mal sécurisée",
    criticite: "Haute",
    ecart: "Porte technique non verrouillée lors de deux passages successifs.",
    statut: "Ouvert",
  },
  {
    id: "004",
    site: "Siège CELC",
    titre: "Documentations SPB non mises à jour",
    criticite: "Faible",
    ecart: "Procédure SPB datée de 2022 encore en usage.",
    statut: "Résolu",
  },
  {
    id: "005",
    site: "Agence Victor Hugo",
    titre: "Absence de consignation incidents mineurs",
    criticite: "Moyenne",
    ecart: "3 incivilités non consignées dans le registre.",
    statut: "Ouvert",
  },
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
            <div className="mb-4 text-sm text-[hsl(var(--fiducial-grey))] font-medium">Encadré rouge: alertes critiques</div>

            <div className="overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[hsl(var(--fiducial-grey))]">
                  <tr>
                    <th className="py-2 px-3">Réf</th>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Écart</th>
                    <th className="py-2 px-3">Criticité</th>
                    <th className="py-2 px-3">Commentaire / Impact</th>
                    <th className="py-2 px-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {ecarts.map((e) => (
                    <tr key={e.id} className={`border-t ${e.criticite === "Haute" ? "bg-red-50" : ""}`}>
                      <td className="py-2 px-3">{e.id}</td>
                      <td className="py-2 px-3">{e.site}</td>
                      <td className="py-2 px-3">{e.titre}</td>
                      <td className="py-2 px-3">{e.criticite}</td>
                      <td className="py-2 px-3">{e.ecart} {e.impact ? <div className="text-xs text-[hsl(var(--fiducial-grey))] mt-1">{e.impact}</div> : null}</td>
                      <td className="py-2 px-3">{e.statut}</td>
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
