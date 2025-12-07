import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type DataPoint = { type: string; count: number };

export default function TypologieIncidentsChart({ period, filter }: { period?: string; filter?: any }) {
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_typologie.json")
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
