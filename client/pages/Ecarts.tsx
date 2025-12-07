import React, { useState } from "react";
import SidebarNav from "@/components/app/Sidebar";
import Modal from "@/components/app/Modal";
import { downloadCSV } from "@/lib/utils";

const ecarts = [
  {
    id: "001",
    site: "Agence Les Halles",
    titre: "Vidéo hors champ",
    criticite: "Haute",
    ecart: "Caméra entrée secondaire ne couvre pas l’espace distributeur interne.",
    impact: "Risque probatoire en cas d’incident.",
    statut: "Ouvert",
    proofs: ["photo1.jpg", "video1.mp4"],
  },
  {
    id: "002",
    site: "Agence République",
    titre: "Posture sécuritaire insuffisante",
    criticite: "Moyenne",
    ecart: "Accueil non conforme à la posture SPB (téléphone + documentation interne visible).",
    statut: "En cours",
    proofs: [],
  },
  {
    id: "003",
    site: "Agence Saint-Pierre",
    titre: "Porte arrière mal sécurisée",
    criticite: "Haute",
    ecart: "Porte technique non verrouillée lors de deux passages successifs.",
    statut: "Ouvert",
    proofs: ["report.pdf"],
  },
  {
    id: "004",
    site: "Siège CELC",
    titre: "Documentations SPB non mises à jour",
    criticite: "Faible",
    ecart: "Procédure SPB datée de 2022 encore en usage.",
    statut: "Résolu",
    proofs: [],
  },
  {
    id: "005",
    site: "Agence Victor Hugo",
    titre: "Absence de consignation incidents mineurs",
    criticite: "Moyenne",
    ecart: "3 incivilités non consignées dans le registre.",
    statut: "Ouvert",
    proofs: [],
  },
];

export default function Ecarts() {
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (e: any) => {
    setSelected(e);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const exportAll = () => {
    const rows = ecarts.map((e) => ({ Ref: e.id, Site: e.site, Ecart: e.titre, Criticite: e.criticite, Statut: e.statut }));
    downloadCSV("ecarts_export.csv", rows);
  };

  const downloadProof = (name: string) => {
    // Simulated download: create a small text file
    const blob = new Blob([`Preuve: ${name}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Fiches d'écarts & Observations</h2>
              <p className="text-sm text-[hsl(var(--fiducial-grey))]">SPB et PRISCOP - observations techniques et organisationnelles</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={exportAll} className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white">Exporter CSV</button>
            </div>
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
                    <th className="py-2 px-3">Actions</th>
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
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openModal(e)} className="text-sm text-[hsl(var(--bg))]">Voir</button>
                          <button className="text-sm text-[hsl(var(--bg))]" onClick={() => e.proofs?.length && downloadProof(e.proofs[0])}>Télécharger preuve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal open={open} onClose={closeModal} title={selected ? `${selected.id} — ${selected.titre}` : "Détail"}>
            {selected && (
              <div>
                <div className="mb-2"><strong>Site:</strong> {selected.site}</div>
                <div className="mb-2"><strong>Criticité:</strong> {selected.criticite}</div>
                <div className="mb-2"><strong>Écart:</strong> {selected.ecart}</div>
                {selected.impact && <div className="mb-2"><strong>Impact:</strong> {selected.impact}</div>}
                <div className="mb-4"><strong>Statut:</strong> {selected.statut}</div>
                <div className="mb-2"><strong>Preuves:</strong></div>
                <ul className="mb-4">
                  {selected.proofs?.length ? selected.proofs.map((p: string, i: number) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-sm">{p}</span>
                      <button className="text-sm text-[hsl(var(--bg))]" onClick={() => downloadProof(p)}>Télécharger</button>
                    </li>
                  )) : <li className="text-sm text-[hsl(var(--fiducial-grey))]">Aucune preuve attachée</li>}
                </ul>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}
