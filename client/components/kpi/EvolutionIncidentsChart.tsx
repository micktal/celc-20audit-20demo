import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DataPoint = { mois: string; incidents: number };

export default function EvolutionIncidentsChart({ period, filter }: { period?: string; filter?: any }) {
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_evolution.json")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setData(d);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [period, filter]);

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
