import React from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/app/Sidebar";
import KpiCard from "@/components/app/KpiCard";
import { useAuth } from "@/state/auth";
import AgenciesMap from "@/components/app/AgenciesMap";
import AgenciesTable from "@/components/app/AgenciesTable";
import AgencyDetailsPanel from "@/components/app/AgencyDetailsPanel";
import IncidentsHeatmap from "@/components/app/IncidentsHeatmap";
import type { Agency } from "@/components/app/types";
import React, { useEffect, useState } from "react";

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
  const [reloadKey, setReloadKey] = React.useState(0);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [errorAgencies, setErrorAgencies] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  const reloadAgencies = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    let mounted = true;
    setLoadingAgencies(true);
    setErrorAgencies(null);
    fetch("/data/agences.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        const parsed: Agency[] = (data || []).map((d: any) => ({
          id: String(d.id),
          name: String(d.name || ""),
          city: String(d.city || ""),
          lat: Number(d.lat),
          lng: Number(d.lng),
          status: d.status === "Treated" || d.status === "InProgress" || d.status === "ToDo" ? d.status : "ToDo",
        }));
        setAgencies(parsed);
        setLoadingAgencies(false);
      })
      .catch(() => {
        if (!mounted) return;
        setErrorAgencies("Erreur lors du chargement des agences.");
        setLoadingAgencies(false);
      });

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

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

          <section className="mt-8">
            <div className="grid grid-cols-1 mb-6">
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
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-1" style={{ minWidth: 0 }}>
                <AgenciesMap agencies={agencies} reloadKey={reloadKey} selectedAgencyId={selectedAgency?.id || null} onSelectAgency={(a) => setSelectedAgency(a)} />
              </div>

              <div style={{ width: 420 }}>
                <AgenciesTable agencies={agencies} selectedAgencyId={selectedAgency?.id || null} onSelectAgency={(id) => {
                  const match = agencies.find((x) => x.id === id);
                  setSelectedAgency(match || null);
                }} />
              </div>

              {selectedAgency && <AgencyDetailsPanel agency={selectedAgency} onClose={() => setSelectedAgency(null)} />}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Cartographie des agences auditées</h3>
              <div>
                <button onClick={reloadAgencies} className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white text-sm">Recharger les données agences</button>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <AgenciesMap reloadKey={reloadKey} />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
