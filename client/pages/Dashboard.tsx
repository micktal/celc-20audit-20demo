import React from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/app/Sidebar";
import KpiCard from "@/components/app/KpiCard";
import { useAuth } from "@/state/auth";
import AgenciesMap from "@/components/app/AgenciesMap";

export default function Dashboard() {
  const kpis = [
    { label: "Audit des sites", value: "12 / 18 agences visitées", variant: "primary" },
    { label: "Avancement global", value: "68%" },
    { label: "Documents collectés", value: "42 / 56" },
    { label: "Évaluation PRISCOP", value: "54% complétée", variant: "accent" },
  ];

  const timeline = [
    { week: "Semaine 1", title: "Cadrage & Collecte documentaire", status: "Terminé", ok: true },
    { week: "Semaine 2", title: "Lancement des audits terrain", status: "Terminé", ok: true },
    { week: "Semaine 3", title: "Audits en cours", status: "8 agences restantes", ok: false },
    { week: "Semaine 4", title: "Analyse SPB + étude des incidents", status: "En préparation", ok: false },
    { week: "Semaine 5", title: "Revue PRISCOP + consolidation", status: "À venir", ok: false },
    { week: "Semaine 6", title: "Livrables & restitution", status: "Planifié", ok: false },
  ];

  const messages = {
    planning: "Aucun retard sur le planning",
    incidents: "Incidents remontés : 7 (incivilités + tentatives d’effraction)",
    attention: "Points d’attention : documentation SPB partiellement obsolète",
  };

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
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Timeline projet</h3>
                  <p className="text-sm text-[hsl(var(--fiducial-grey))] mt-1">Suivi des jalons et état d’avancement</p>
                </div>
                <div className="text-sm text-[hsl(var(--fiducial-grey))]">Dernière mise à jour: 28/02/2025</div>
              </div>

              <ol className="mt-4 space-y-3">
                {timeline.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`h-8 w-8 flex items-center justify-center rounded-full ${t.ok ? "bg-green-600 text-white" : "bg-gray-100 text-[hsl(var(--fiducial-grey))]"}`}>
                      {t.ok ? "✔" : idx === 2 ? "…" : "•"}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t.week} – {t.title}</div>
                      <div className="text-xs text-[hsl(var(--fiducial-grey))]">{t.status}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/documents" className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white text-sm">Documents</Link>
                <Link to="/ecarts" className="px-3 py-2 rounded-md border border-border text-sm">Fiches d'écarts</Link>
                <Link to="/plan-action" className="px-3 py-2 rounded-md border border-border text-sm">Plan d’Action</Link>
                <Link to="/livrables" className="px-3 py-2 rounded-md border border-border text-sm">Livrables</Link>
              </div>
            </div>

            <aside className="bg-white p-4 rounded-lg border border-border">
              <h4 className="font-semibold">Messages d’état</h4>
              <ul className="mt-3 text-sm text-[hsl(var(--fiducial-grey))] space-y-2">
                <li>{messages.planning}</li>
                <li>{messages.incidents}</li>
                <li>{messages.attention}</li>
              </ul>
            </aside>
          </section>

          <section className="mt-8">
            <div className="grid grid-cols-1">
              <AgenciesMap />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
