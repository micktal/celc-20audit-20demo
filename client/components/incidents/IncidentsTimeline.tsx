import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFilters } from "@/state/filters";

type Incident = {
  id: string;
  date: string; // YYYY-MM-DD
  heure: string;
  type: string;
  criticite: string;
  agenceId: string;
  agenceNom: string;
  ville: string;
  description: string;
  severiteScore: number;
};

function parseDate(d: string) {
  return new Date(d + "T00:00:00");
}

export default function IncidentsTimeline() {
  const filters = useFilters();
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_detail.json")
      .then((r) => r.json())
      .then((items: Incident[]) => {
        if (!mounted) return;
        // apply filters
        let filtered = items.slice();
        // period filter (simple implementation based on days)
        const now = new Date();
        const periodDays =
          filters.period === "30j"
            ? 30
            : filters.period === "90j"
              ? 90
              : filters.period === "180j"
                ? 180
                : 365;
        const cutoff = new Date(
          now.getTime() - periodDays * 24 * 60 * 60 * 1000,
        );
        filtered = filtered.filter((it) => parseDate(it.date) >= cutoff);

        if (filters.agencyId)
          filtered = filtered.filter((it) => it.agenceId === filters.agencyId);
        if (filters.criticity !== "All")
          filtered = filtered.filter(
            (it) => it.criticite === filters.criticity,
          );
        if (filters.typologie !== "All")
          filtered = filtered.filter((it) => it.type === filters.typologie);

        // group by date
        const grouped: Record<string, number> = {};
        filtered.forEach((it) => {
          grouped[it.date] = (grouped[it.date] || 0) + 1;
        });

        const out = Object.keys(grouped)
          .sort()
          .map((date) => ({ date, count: grouped[date] }));

        setData(out);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [filters.period, filters.agencyId, filters.criticity, filters.typologie]);

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border h-64">
      <h4 className="font-semibold mb-2">Timeline des incidents</h4>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF8A00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF8A00" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#FF8A00"
            fillOpacity={1}
            fill="url(#colorInc)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
