import React, { useEffect, useState } from "react";
import SidebarNav from "@/components/app/Sidebar";
import KpiCard from "@/components/app/KpiCard";
import EvolutionIncidentsChart from "@/components/kpi/EvolutionIncidentsChart";
import TypologieIncidentsChart from "@/components/kpi/TypologieIncidentsChart";
import CriticiteDonut from "@/components/kpi/CriticiteDonut";
import RadarPriscop from "@/components/kpi/RadarPriscop";
import HeatmapRisques from "@/components/kpi/HeatmapRisques";
import ActiveFilters from "@/components/kpi/ActiveFilters";
import { useFilters } from "@/state/filters";

type KpiData = {
  incidents_total: number;
  incidents_h0: number;
  incidents_h1: number;
  priscop_conformite: number;
  ecarts_total: number;
  score_spb: number;
};

export default function DashboardKpi() {
  const [kpi, setKpi] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);
  const filters = useFilters();
  const period = filters.period;
  const agence = filters.agencyId || "Toutes";
  const criticite = filters.criticity === "All" ? "Tous" : filters.criticity;
  const typologie = filters.typologie === "All" ? "Tous" : filters.typologie;

  useEffect(() => {
    let mounted = true;
    fetch('/data/kpi.json')
      .then(r => r.json())
      .then(d => { if (!mounted) return; setKpi(d); setLoading(false); })
      .catch(() => { if (!mounted) return; setLoading(false); });
    return () => { mounted = false; }
  }, []);

  if (loading || !kpi) {
    return (
      <div className="min-h-screen bg-[hsl(var(--light-grey))]">
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold">Dashboard KPI SPB</h1>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">Vue d'ensemble des indicateurs clés SPB, incidents et conformité PRISCOP.</p>
            <div className="mt-6">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F5F6F8' }}>
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Dashboard KPI SPB</h1>
          <p className="text-sm text-[hsl(var(--fiducial-grey))]">Vue d'ensemble des indicateurs clés SPB, incidents et conformité PRISCOP.</p>

          {/* Filter Bar */}
          <div className="mt-6 bg-white p-4 rounded-[20px] shadow-sm border border-border flex flex-wrap items-center gap-3">
            <select value={period} onChange={(e) => filters.setPeriod(e.target.value as any)} className="p-2 border rounded">
              <option value="30j">30j</option>
              <option value="90j">90j</option>
              <option value="180j">180j</option>
              <option value="1an">1 an</option>
            </select>

            <select value={agence} onChange={(e) => filters.setAgency(e.target.value === "Toutes" ? null : e.target.value)} className="p-2 border rounded">
              <option>Toutes</option>
              <option>Orléans</option>
              <option>Tours</option>
            </select>

            <select value={criticite} onChange={(e) => filters.setCriticity(e.target.value === "Tous" ? "All" : (e.target.value as any))} className="p-2 border rounded">
              <option>Tous</option>
              <option>H0</option>
              <option>H1</option>
              <option>H2</option>
              <option>Faible</option>
            </select>

            <select value={typologie} onChange={(e) => filters.setTypologie(e.target.value === "Tous" ? "All" : e.target.value)} className="p-2 border rounded">
              <option>Tous</option>
              <option>Intrusion</option>
              <option>Incivilité</option>
            </select>
          </div>

          {/* KPI Cards */}
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <KpiCard label="Incidents totaux" value={kpi.incidents_total} />
            </div>
            <div>
              <KpiCard label="Incidents critiques (H0)" value={kpi.incidents_h0} />
            </div>
            <div>
              <KpiCard label="Incidents majeurs (H1)" value={kpi.incidents_h1} />
            </div>
            <div>
              <KpiCard label="Taux de conformité PRISCOP" value={`${kpi.priscop_conformite}%`} />
            </div>
            <div>
              <KpiCard label="Nombre d'écarts PRISCOP" value={kpi.ecarts_total} />
            </div>
            <div>
              <KpiCard label="Score global SPB" value={`${kpi.score_spb}`} />
            </div>
          </section>

          {/* Charts */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EvolutionIncidentsChart period={period} filter={{ agence, criticite, typologie }} />
            </div>
            <div>
              <TypologieIncidentsChart period={period} filter={{ agence, criticite, typologie }} />
            </div>

            <div className="lg:col-span-1">
              <CriticiteDonut period={period} filter={{ agence, criticite, typologie }} />
            </div>

            <div className="lg:col-span-2">
              <RadarPriscop period={period} filter={{ agence, criticite, typologie }} />
            </div>

            <div className="lg:col-span-1">
              <HeatmapRisques period={period} filter={{ agence, criticite, typologie }} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
