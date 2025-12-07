import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

function toTimestamp(dateStr: string, timeStr?: string) {
  return new Date(dateStr + "T" + (timeStr || "00:00") + ":00").getTime();
}

export default function IncidentsSeverityCluster() {
  const filters = useFilters();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch("/data/incidents_detail.json")
      .then((r) => r.json())
      .then((items: Incident[]) => {
        if (!mounted) return;
        let filtered = items.slice();
        // period
        const now = new Date();
        const periodDays = filters.period === "30j" ? 30 : filters.period === "90j" ? 90 : filters.period === "180j" ? 180 : 365;
        const cutoff = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
        filtered = filtered.filter((it) => toTimestamp(it.date) >= cutoff.getTime());

        if (filters.agencyId) filtered = filtered.filter((it) => it.agenceId === filters.agencyId);
        if (filters.criticity !== "All") filtered = filtered.filter((it) => it.criticite === filters.criticity);
        if (filters.typologie !== "All") filtered = filtered.filter((it) => it.type === filters.typologie);

        const mapped = filtered.map((it) => ({
          x: toTimestamp(it.date, it.heure),
          y: it.severiteScore,
          id: it.id,
          date: it.date,
          heure: it.heure,
          type: it.type,
          criticite: it.criticite,
          agenceNom: it.agenceNom,
          description: it.description,
        }));

        setData(mapped);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [filters.period, filters.agencyId, filters.criticity, filters.typologie]);

  const colorOf = (criticite: string) => {
    switch (criticite) {
      case "H0":
        return "#C0392B";
      case "H1":
        return "#E67E22";
      case "H2":
        return "#F1C40F";
      default:
        return "#2ECC71";
    }
  };

  const tooltipFormatter = (value: any, name: any, props: any) => {
    // value is [x,y]
    return [`${new Date(value[0]).toLocaleString()} — ${value[1]}`, "Severité"];
  };

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border h-64">
      <h4 className="font-semibold mb-2">Sévérité temporelle (timeline)</h4>
      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid />
          <XAxis
            dataKey="x"
            name="Date"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(t) => new Date(t).toLocaleDateString()}
          />
          <YAxis dataKey="y" name="Sévérité" domain={[0, 1]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: any, name: any, props: any) => {
              const payload = props?.payload;
              return [`${payload.date} ${payload.heure} — ${payload.type} — ${payload.criticite}`, "Détails"];
            }}
          />

          {data.length > 0 && (
            <Scatter
              data={data}
              fill="#8884d8"
              shape={(props) => {
                const { payload, cx, cy } = props as any;
                const size = payload.criticite === "H0" || payload.criticite === "H1" ? 10 : 6;
                const color = colorOf(payload.criticite);
                return (
                  <circle cx={cx} cy={cy} r={size} fill={color} fillOpacity={0.9} stroke="#fff" strokeWidth={1} />
                );
              }}
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
