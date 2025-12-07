import React from "react";

type KpiCardProps = {
  label: string;
  value: string | number;
  description?: string;
  variant?: "primary" | "neutral" | "accent";
};

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  description,
  variant = "neutral",
}) => {
  const base = "rounded-lg p-4 shadow-sm border bg-card";
  const color =
    variant === "primary"
      ? "border-l-4 border-primary/90"
      : variant === "accent"
        ? "border-l-4 border-[hsl(var(--fiducial-red))]"
        : "border border-border";

  return (
    <div className={`${base} ${color}`}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
      {description && (
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      )}
    </div>
  );
};

export default KpiCard;
