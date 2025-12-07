import React, { useMemo, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type AgencyStatus = "Treated" | "InProgress" | "ToDo";

type Agency = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  status: AgencyStatus;
};

function colorByStatus(s: AgencyStatus) {
  switch (s) {
    case "Treated":
      return "#2ECC71"; // green
    case "InProgress":
      return "#F39C12"; // orange
    case "ToDo":
      return "#E74C3C"; // red
    default:
      return "#666";
  }
}

function labelFr(s: AgencyStatus) {
  switch (s) {
    case "Treated":
      return "Traitée";
    case "InProgress":
      return "En cours";
    case "ToDo":
      return "À traiter";
    default:
      return s;
  }
}

export default function AgenciesMap({ reloadKey }: { reloadKey?: number }) {
  const center: LatLngExpression = [47.9, 1.9];
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch("/data/agences.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Validate and normalize
        const parsed: Agency[] = (data || []).map((d: any) => {
          const status = (d.status === "Treated" || d.status === "InProgress" || d.status === "ToDo") ? d.status : "ToDo";
          return {
            id: String(d.id),
            name: String(d.name || ""),
            city: String(d.city || ""),
            lat: Number(d.lat),
            lng: Number(d.lng),
            status,
          } as Agency;
        });
        if (mounted) {
          setAgencies(parsed);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError("Erreur lors du chargement des agences.");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [reloadKey]);

  const summary = useMemo(() => {
    const total = agencies.length;
    const treated = agencies.filter((a) => a.status === "Treated").length;
    const inProgress = agencies.filter((a) => a.status === "InProgress").length;
    const toDo = agencies.filter((a) => a.status === "ToDo").length;
    const progress = total ? Math.round((treated / total) * 100) : 0;
    return { total, treated, inProgress, toDo, progress };
  }, [agencies]);

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
      <h3 className="text-lg font-semibold mb-3">Cartographie des agences auditées</h3>
      <div style={{ height: 420, width: "100%", borderRadius: 16, overflow: "hidden" }}>
        <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {agencies.map((a) => (
            <CircleMarker
              key={a.id}
              center={[a.lat, a.lng]}
              radius={10}
              pathOptions={{ color: colorByStatus(a.status), fillColor: colorByStatus(a.status), fillOpacity: 0.85, weight: 0 }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <div className="text-sm">
                  <div className="font-medium">{a.name} – {a.city}</div>
                  <div className="text-xs">{labelFr(a.status)}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <LegendDot color="#2ECC71" label="Agences traitées" />
          <LegendDot color="#F39C12" label="Agences en cours" />
          <LegendDot color="#E74C3C" label="Agences à traiter" />
        </div>

        <div className="bg-[hsl(var(--light-grey))] rounded-md p-3 text-sm">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 items-center">
            <div>
              <div className="text-xs text-[hsl(var(--fiducial-grey))]">Traité</div>
              <div className="font-semibold">{summary.treated}</div>
            </div>
            <div>
              <div className="text-xs text-[hsl(var(--fiducial-grey))]">En cours</div>
              <div className="font-semibold">{summary.inProgress}</div>
            </div>
            <div>
              <div className="text-xs text-[hsl(var(--fiducial-grey))]">À traiter</div>
              <div className="font-semibold">{summary.toDo}</div>
            </div>
            <div>
              <div className="text-xs text-[hsl(var(--fiducial-grey))]">Avancement global</div>
              <div className="font-semibold">{summary.progress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ background: color }} className="inline-block w-3 h-3 rounded-full" />
      <span className="text-sm text-[hsl(var(--fiducial-grey))]">{label}</span>
    </div>
  );
}
