import React from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/app/Sidebar";
import KpiCard from "@/components/app/KpiCard";
import { useAuth } from "@/state/auth";

export default function Dashboard() {
  const kpis = [
    { label: "% Audit completion", value: "62%", variant: "primary" },
    { label: "Sites visited", value: "12 / 20" },
    { label: "Documents collected", value: "84 / 120" },
    { label: "PRISCOP progress", value: "45%", variant: "accent" },
  ];

  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Audit SPB & PRISCOP – CELC</h2>
              <p className="text-sm text-[hsl(var(--fiducial-grey))]">Mission en cours</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={logout} className="text-sm text-[hsl(var(--fiducial-grey))]">Se déconnecter</button>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <KpiCard key={i} label={k.label} value={k.value as any} variant={(k as any).variant} />
            ))}
          </section>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-border">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <ol className="mt-4 space-y-3 text-sm text-[hsl(var(--fiducial-grey))]">
                <li><strong>Week 1:</strong> Cadrage & collecte documentaire</li>
                <li><strong>Week 2–4:</strong> Audits terrain</li>
                <li><strong>Week 4–5:</strong> Analyse SPB + PRISCOP</li>
                <li><strong>Week 6:</strong> Livrables & restitution</li>
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/documents" className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white text-sm">Documents</Link>
                <Link to="/ecarts" className="px-3 py-2 rounded-md border border-border text-sm">Findings</Link>
                <Link to="/plan-action" className="px-3 py-2 rounded-md border border-border text-sm">Plan d’Action</Link>
                <Link to="/livrables" className="px-3 py-2 rounded-md border border-border text-sm">Livrables</Link>
              </div>
            </div>

            <aside className="bg-white p-4 rounded-lg border border-border">
              <h4 className="font-semibold">Quick overview</h4>
              <p className="mt-2 text-sm text-[hsl(var(--fiducial-grey))]">Synthèse rapide des points critiques et actions prioritaires.</p>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
