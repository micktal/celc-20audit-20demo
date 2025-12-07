import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

type Incident = {
  lat: number;
  lng: number;
  severite: number; // 0..1
};

function HeatLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points?.length) return;
    const heat = (L as any).heatLayer(points, {
      radius: 40,
      blur: 25,
      maxZoom: 14,
      minOpacity: 0.35,
      gradient: {
        0.4: "#4DA3FF",
        0.6: "#1F78FF",
        0.8: "#FF8A00",
        1.0: "#FF0033",
      },
    }).addTo(map);

    return () => {
      try {
        map.removeLayer(heat);
      } catch {}
    };
  }, [map, points]);

  return null;
}

export default function IncidentsHeatmap() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const center: [number, number] = [47.9, 1.9];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetch("/data/incidents.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        const parsed = (data || []).map((d: any) => ({ lat: Number(d.lat), lng: Number(d.lng), severite: Math.max(0, Math.min(1, Number(d.severite) || 0)) }));
        setIncidents(parsed);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Erreur lors du chargement des incidents.");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const points = incidents.map((i) => [i.lat, i.lng, i.severite] as [number, number, number]);

  if (loading) {
    return (
      <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
        <div className="h-[420px] w-full animate-pulse bg-gray-100 rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
        <div className="text-red-700 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-3">Heatmap des incidents SPB</h3>
      <div style={{ height: 420, width: "100%", borderRadius: 16, overflow: "hidden" }}>
        <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <HeatLayer points={points} />
        </MapContainer>
      </div>
    </div>
  );
}
