import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-sm font-medium ${
        active ? "bg-[hsl(var(--bg))] text-white" : "text-[hsl(var(--fiducial-grey))] hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
};

export const SidebarNav: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-border p-4 hidden md:block">
      <div className="mb-6 flex items-center gap-3">
        <img src="https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2Fd8ddee4c297645b1bb027a8ab82cbe7a?format=webp&width=800" alt="FIDUCIAL logo" className="h-12 w-12 object-contain" />
        <div>
          <div className="text-sm font-bold text-[hsl(var(--bg))]">FIDUCIAL</div>
          <div className="text-xs text-[hsl(var(--fiducial-grey))]">Sécurité Conseil</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        <NavItem to="/dashboard" label="Tableau de bord" />
        <NavItem to="/documents" label="Documents" />
        <NavItem to="/ecarts" label="Fiches d'écarts" />
        <NavItem to="/plan-action" label="Plan d'action" />
        <NavItem to="/livrables" label="Livrables" />
        <NavItem to="/dashboard-kpi" label="KPI SPB" />
        <NavItem to="/analyse-incidents" label="Analyse incidents" />
      </nav>
    </aside>
  );
};

export default SidebarNav;
