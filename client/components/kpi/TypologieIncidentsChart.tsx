import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DataPoint = { type: string; count: number };

import { useFilters } from "@/state/filters";

export default function TypologieIncidentsChart() {
  const filters = useFilters();
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_typologie.json")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        let processed = d as DataPoint[];
        if (filters.criticity !== "All") {
          // simulate filter by reducing counts
          processed = processed.map((p) => ({ ...p, count: Math.round(p.count * 0.8) }));
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
      <h4 className="font-semibold mb-2">Typologie des incidents</h4>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#FF8A00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
