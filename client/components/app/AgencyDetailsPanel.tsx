import React from "react";
import type { Agency } from "./types";
import { Link } from "react-router-dom";

export default function AgencyDetailsPanel({ agency, onClose }: { agency?: Agency | null; onClose?: () => void }) {
  if (!agency) return null;

  // mock values
  const lastAudit = "20/02/2025";
  const findings = Math.floor(Math.random() * 10) + 1;

  return (
    <div style={{ width: 320, background: "white", borderLeft: "1px solid #DDD", padding: 20, boxShadow: "-5px 0px 20px rgba(0,0,0,0.1)" }} className="fixed right-0 top-0 bottom-0 z-50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-semibold">{agency.name}</div>
          <div className="text-sm text-[hsl(var(--fiducial-grey))]">{agency.city}</div>
        </div>
        <button onClick={onClose} className="text-sm text-[hsl(var(--fiducial-grey))]">Fermer</button>
      </div>

      <div className="mb-3">
        <div className="inline-block px-2 py-1 text-xs rounded-full bg-[hsl(var(--light-grey))]">Statut: <span className="font-semibold ml-2">{agency.status}</span></div>
      </div>

      <div className="text-sm text-[hsl(var(--fiducial-grey))] space-y-2">
        <div><strong>Coordonnées:</strong> {agency.lat.toFixed(4)}, {agency.lng.toFixed(4)}</div>
        <div><strong>Dernier audit:</strong> {lastAudit}</div>
        <div><strong>Nombre d'écarts:</strong> {findings}</div>
      </div>

      <div className="mt-6">
        <Link to="/ecarts" className="px-3 py-2 rounded-md bg-[hsl(var(--bg))] text-white">Voir fiches d’écarts</Link>
      </div>
    </div>
  );
}
