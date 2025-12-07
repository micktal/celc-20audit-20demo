import React, { useEffect, useState } from "react";

type Cell = { impact: number; probabilite: number; niveau: string };

export default function HeatmapRisques({ period, filter }: { period?: string; filter?: any }) {
  const [data, setData] = useState<Cell[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch("/data/risques_matrix.json")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setData(d as Cell[]);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [period, filter]);

  // Render a 4x4 grid, map levels to color
  const getColor = (niveau?: string) => {
    switch (niveau) {
      case "Critique":
        return "#E74C3C";
      case "Élevé":
        return "#FF8A00";
      case "Modéré":
        return "#F3C26B";
      default:
        return "#2ECC71";
    }
  };

  const cells = Array.from({ length: 4 }).map((_, i) =>
    Array.from({ length: 4 }).map((__, j) => {
      const found = data.find((c) => c.impact === 4 - i && c.probabilite === j + 1);
      return { impact: 4 - i, probabilite: j + 1, niveau: found?.niveau };
    }),
  );

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
      <h4 className="font-semibold mb-2">Matrice des risques (Impact x Probabilité)</h4>
      <div className="grid grid-cols-4 gap-2">
        {cells.flat().map((c, idx) => (
          <div key={idx} className="p-4 rounded-md text-center" style={{ background: getColor(c.niveau), minHeight: 80 }}>
            <div className="text-sm font-medium">I{c.impact} / P{c.probabilite}</div>
            <div className="text-xs mt-1">{c.niveau || "Faible"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
