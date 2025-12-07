import React, { useState } from "react";
import SidebarNav from "@/components/app/Sidebar";

type Action = { id: string; title: string; desc: string; criticite: string; responsable: string; deadline: string; done: boolean };

const sample: Action[] = [
  { id: "a1", title: "Verrouillage des accès principaux", desc: "Installer serrures certifiées", criticite: "H0", responsable: "Responsable site", deadline: "2025-04-01", done: false },
  { id: "a2", title: "Mise à jour procédures", desc: "Rédiger procédures de gestion incidents", criticite: "H1", responsable: "RSSI", deadline: "2025-05-15", done: false },
];

export default function PlanAction() {
  const [actions, setActions] = useState<Action[]>(sample);

  const toggle = (id: string) => {
    setActions((s) => s.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Plan d'Action Priorisé</h2>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">Horizon H0 / H1 / H2–H3</p>
          </header>

          <div className="grid gap-4">
            {actions.map((act) => (
              <div key={act.id} className="bg-white p-4 rounded-lg border border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold">{act.title} <span className="text-xs ml-2 text-[hsl(var(--fiducial-grey))]">{act.criticite}</span></div>
                  <div className="text-sm text-[hsl(var(--fiducial-grey))]">{act.desc}</div>
                  <div className="text-xs text-[hsl(var(--fiducial-grey))] mt-1">Responsable: {act.responsable} • Deadline: {act.deadline}</div>
                </div>
                <div>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={act.done} onChange={() => toggle(act.id)} className="w-4 h-4" />
                    <span className="text-sm">Terminé</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
