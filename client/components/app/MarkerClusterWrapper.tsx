import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";

type ChildProps = {
  center?: [number, number];
  radius?: number;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  agencyId?: string;
  onClick?: () => void;
  tooltip?: string;
};

export const MarkerClusterWrapper: React.FC<{
  children: React.ReactElement[];
}> = ({ children }) => {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!map) return;

    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      removeOutsideVisibleBounds: true,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        let color = "#4DA3FF";
        if (count > 30) color = "#0046A6";
        else if (count > 10) color = "#1F78FF";

        const size = 40 + Math.min(40, Math.round(count / 5));

        return L.divIcon({
          html: `<div style="background:${color}; width:${size}px; height:${size}px; border-radius:50%; display:flex; justify-content:center; align-items:center; color:white; font-weight:600; font-size:14px;">${count}</div>`,
          className: "",
          iconSize: L.point(size, size),
        });
      },
    });

    clusterRef.current = clusterGroup;
    map.addLayer(clusterGroup);

    // Helper to add markers
    const addedMarkers: L.Layer[] = [];

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const p = (child.props || {}) as ChildProps;
      const pos = p.center;
      if (!pos) return;
      const opts: L.PathOptions & any = {
        radius: p.radius || 10,
        color: p.color || "#3388ff",
        fillColor: p.fillColor || p.color || "#3388ff",
        fillOpacity: typeof p.fillOpacity === "number" ? p.fillOpacity : 0.85,
        weight: typeof p.weight === "number" ? p.weight : 0,
      };
      const marker = L.circleMarker(pos as [number, number], opts);
      // attach agency id
      (marker as any).agencyId = p.agencyId;

      if (p.tooltip) marker.bindTooltip(p.tooltip);
      if (p.onClick) marker.on("click", p.onClick);

      clusterGroup.addLayer(marker);
      addedMarkers.push(marker);
    });

    // Listen to a custom event to zoomTo a particular agency
    const handler = (e: any) => {
      const id = e?.detail;
      if (!id) return;
      if (!clusterRef.current) return;
      const layers = clusterRef.current.getLayers();
      const target = (layers as any[]).find((l) => (l as any).agencyId === id);
      if (target) {
        // zoomToShowLayer will open cluster and show the marker
        (clusterRef.current as any).zoomToShowLayer(target, () => {
          try {
            // spiderfy if needed
            (target as any).fire("click");
          } catch {}
        });
      }
    };

    window.addEventListener("zoomToAgency", handler as EventListener);

    return () => {
      window.removeEventListener("zoomToAgency", handler as EventListener);
      if (clusterRef.current) {
        clusterRef.current.clearLayers();
        try {
          map.removeLayer(clusterRef.current);
        } catch {}
        clusterRef.current = null;
      }
      // remove added markers
      addedMarkers.forEach((m) => {
        try {
          (m as any).off();
        } catch {}
      });
    };
  }, [children, map]);

  return null;
};

export default MarkerClusterWrapper;
