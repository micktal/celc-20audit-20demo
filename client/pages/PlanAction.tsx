import React from "react";
import SidebarNav from "@/components/app/Sidebar";

const H0 = [
  {
    id: "h0-1",
    title: "Caméra hors champ – Agence Les Halles",
    action: "Ajuster l’angle caméra + vérification enregistreur",
    criticite: "H0",
    responsable: "Maintenance",
    deadline: "15 jours",
  },
  {
    id: "h0-2",
    title: "Sécurisation porte arrière – Agence Saint-Pierre",
    action: "Installation ferme-porte + contrôle hebdo",
    criticite: "H0",
    responsable: "Responsable agence",
    deadline: "7 jours",
  },
];

const H1 = [
  {
    id: "h1-1",
    title: "Posture SPB du personnel",
    action: "Rappel interne + micro-formation ciblée",
    criticite: "H1",
    responsable: "Manager réseau",
    deadline: "8 semaines",
  },
  {
    id: "h1-2",
    title: "Registre incidents",
    action: "Mise à jour quotidienne + harmonisation SI",
    criticite: "H1",
    responsable: "Référent sécurité",
    deadline: "12 semaines",
  },
];

const H2H3 = [
  {
    id: "h2-1",
    title: "Modernisation vidéo – sites prioritaires",
    desc: "Anticipation renouvellement parc obsolète",
    priorite: "Haute",
  },
  {
    id: "h2-2",
    title: "Digitalisation documentation SPB",
    desc: "Centralisation SharePoint + versioning",
    priorite: "Moyenne",
  },
];

export default function PlanAction() {
  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Plan d'Action Priorisé</h2>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">
              H0 / H1 / H2–H3 — priorités et responsables
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">
                H0 – Mesures immédiates (&lt; 30 jours)
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                {H0.map((a) => (
                  <li
                    key={a.id}
                    className="p-3 rounded-md border border-border"
                  >
                    <div className="font-medium">
                      {a.title}{" "}
                      <span className="text-xs ml-2 text-[hsl(var(--fiducial-grey))]">
                        {a.criticite}
                      </span>
                    </div>
                    <div className="text-sm text-[hsl(var(--fiducial-grey))] mt-1">
                      Action: {a.action}
                    </div>
                    <div className="text-xs text-[hsl(var(--fiducial-grey))] mt-2">
                      Responsable: {a.responsable} • Deadline: {a.deadline}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">
                H1 – Renforcement organisationnel (1–3 mois)
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                {H1.map((a) => (
                  <li
                    key={a.id}
                    className="p-3 rounded-md border border-border"
                  >
                    <div className="font-medium">
                      {a.title}{" "}
                      <span className="text-xs ml-2 text-[hsl(var(--fiducial-grey))]">
                        {a.criticite}
                      </span>
                    </div>
                    <div className="text-sm text-[hsl(var(--fiducial-grey))] mt-1">
                      Action: {a.action}
                    </div>
                    <div className="text-xs text-[hsl(var(--fiducial-grey))] mt-2">
                      Responsable: {a.responsable} • Deadline: {a.deadline}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="font-semibold">
                H2–H3 – Améliorations techniques & modernisation (3–12 mois)
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                {H2H3.map((a) => (
                  <li
                    key={a.id}
                    className="p-3 rounded-md border border-border"
                  >
                    <div className="font-medium">
                      {a.title}{" "}
                      <span className="text-xs ml-2 text-[hsl(var(--fiducial-grey))]">
                        Priorité: {a.priorite}
                      </span>
                    </div>
                    <div className="text-sm text-[hsl(var(--fiducial-grey))] mt-1">
                      {a.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
