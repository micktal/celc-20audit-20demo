import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DataPoint = { mois: string; incidents: number };

import { useFilters } from "@/state/filters";

export default function EvolutionIncidentsChart() {
  const filters = useFilters();
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_evolution.json")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        // apply basic filter simulation: if agency selected, reduce values by 20%
        let processed = d as DataPoint[];
        if (filters.agencyId) {
          processed = processed.map((p) => ({ ...p, incidents: Math.round(p.incidents * 0.6) }));
        }
        setData(processed);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [filters.period, filters.agencyId, filters.criticity, filters.typologie]);

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border h-64">
      <h4 className="font-semibold mb-2">Évolution des incidents (mois)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="incidents" stroke="#007ABC" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
