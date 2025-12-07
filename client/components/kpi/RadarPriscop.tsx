import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DataPoint = { lot: string; score: number };

import { useFilters } from "@/state/filters";

export default function RadarPriscop() {
  const filters = useFilters();
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/priscop_radar.json")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        let processed = d as DataPoint[];
        if (filters.agencyId) {
          processed = processed.map((p) => ({
            ...p,
            score: Math.max(50, p.score - 5),
          }));
        }
        setData(processed as DataPoint[]);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [filters.period, filters.agencyId, filters.criticity, filters.typologie]);

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border h-80">
      <h4 className="font-semibold mb-2">Radar PRISCOP</h4>
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="lot" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#007ABC"
            fill="#007ABC"
            fillOpacity={0.3}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
