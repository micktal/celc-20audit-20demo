import React from "react";
import SidebarNav from "@/components/app/Sidebar";
import IncidentsTimeline from "@/components/incidents/IncidentsTimeline";
import IncidentsSeverityCluster from "@/components/incidents/IncidentsSeverityCluster";
import IncidentsTable from "@/components/incidents/IncidentsTable";
import { useFilters } from "@/state/filters";

export default function AnalyseIncidents() {
  const filters = useFilters();

  return (
    <div className="min-h-screen bg-[hsl(var(--light-grey))]">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Analyse des incidents SPB</h1>
          <p className="text-sm text-[hsl(var(--fiducial-grey))]">
            Visualisation détaillée des incidents, de leur sévérité et de leur
            répartition dans le temps.
          </p>

          <div className="mt-6 bg-white p-4 rounded-[20px] shadow-sm border border-border flex flex-wrap items-center gap-3">
            <select
              value={filters.period}
              onChange={(e) => filters.setPeriod(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="30j">30j</option>
              <option value="90j">90j</option>
              <option value="180j">180j</option>
              <option value="1an">1 an</option>
            </select>

            <select
              value={filters.agencyId || "Toutes"}
              onChange={(e) =>
                filters.setAgency(
                  e.target.value === "Toutes" ? null : e.target.value,
                )
              }
              className="p-2 border rounded"
            >
              <option>Toutes</option>
              <option value="a1">Orléans - Les Halles</option>
              <option value="a2">Tours République</option>
              <option value="a3">Bourges Centre</option>
            </select>

            <select
              value={filters.criticity}
              onChange={(e) => filters.setCriticity(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="All">Tous</option>
              <option value="H0">H0</option>
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="Faible">Faible</option>
            </select>

            <select
              value={filters.typologie}
              onChange={(e) => filters.setTypologie(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="All">Tous</option>
              <option value="Intrusion">Intrusion</option>
              <option value="Incivilité">Incivilité</option>
              <option value="Vol">Vol</option>
              <option value="Agression">Agression</option>
            </select>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/5">
              <IncidentsTimeline />
            </div>
            <div className="lg:w-2/5">
              <IncidentsSeverityCluster />
            </div>
          </div>

          <div className="mt-8">
            <IncidentsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
