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

export default function AgenciesMap({ agencies: agenciesProp, reloadKey, selectedAgencyId, onSelectAgency }: { agencies?: Agency[]; reloadKey?: number; selectedAgencyId?: string | null; onSelectAgency?: (agency: Agency) => void }) {
  const center: LatLngExpression = [47.9, 1.9];
  const [agencies, setAgencies] = useState<Agency[]>(agenciesProp || []);
  const [loading, setLoading] = useState(!agenciesProp?.length);
  const [error, setError] = useState<string | null>(null);
  const [animatedId, setAnimatedId] = useState<string | null>(null);
  const mapRef = React.useRef<any>(null);

  useEffect(() => {
    if (agenciesProp && agenciesProp.length) {
      setAgencies(agenciesProp);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch("/data/agences.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
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
  }, [agenciesProp, reloadKey]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!selectedAgencyId) return;
    const a = agencies.find((x) => x.id === selectedAgencyId);
    if (a) {
      try {
        mapRef.current.setView([a.lat, a.lng], 12, { animate: true });
      } catch {}
    }
  }, [selectedAgencyId, agencies]);

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
        <MapContainer whenCreated={(map) => (mapRef.current = map)} center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Use MarkerClusterWrapper to manage clustering with leaflet.markercluster */}
          {/* Children are simple div elements carrying marker props which the wrapper reads */}
          <MarkerClusterWrapper>
            {agencies.map((a) => {
              const isSelected = !!selectedAgencyId && a.id === selectedAgencyId;
              const isAnimated = animatedId === a.id;
              const radius = isSelected ? 14 : isAnimated ? 16 : 10;
              const color = isSelected ? "#3498DB" : colorByStatus(a.status);

              return (
                <div
                  key={a.id}
                  center={[a.lat, a.lng]}
                  radius={radius}
                  color={color}
                  fillColor={colorByStatus(a.status)}
                  fillOpacity={isSelected ? 1 : 0.85}
                  weight={isSelected ? 2 : 0}
                  agencyId={a.id}
                  tooltip={`${a.name} – ${a.city}\n${labelFr(a.status)}`}
                  onClick={() => {
                    setAnimatedId(a.id);
                    setTimeout(() => setAnimatedId(null), 300);
                    if (onSelectAgency) onSelectAgency(a);
                    // dispatch custom event to make the cluster wrapper reveal the marker
                    window.dispatchEvent(new CustomEvent("zoomToAgency", { detail: a.id }));
                    // also fly the map to the marker
                    try {
                      if (mapRef.current) mapRef.current.flyTo([a.lat, a.lng], 12, { duration: 0.4 });
                    } catch {}
                  }}
                />
              );
            })}
          </MarkerClusterWrapper>
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
