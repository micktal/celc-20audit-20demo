import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type DataPoint = { criticite: string; value: number };

const COLORS = ["#E74C3C", "#F39C12", "#4DA3FF", "#2ECC71"];

export default function CriticiteDonut({ period, filter }: { period?: string; filter?: any }) {
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_criticite.json")
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
      <h4 className="font-semibold mb-2">Répartition par criticité</h4>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie dataKey="value" data={data} innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
