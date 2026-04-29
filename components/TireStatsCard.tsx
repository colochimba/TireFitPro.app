"use client";

import { TireMetrics } from "@/lib/tireCalculations";

interface TireStatsCardProps {
  label: string;
  metrics: TireMetrics;
  color: "orange" | "blue";
}

const StatRow = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[#334155] last:border-0">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="font-semibold text-white text-sm">
      {value}
      {unit && <span className="text-slate-500 text-xs ml-1">{unit}</span>}
    </span>
  </div>
);

export default function TireStatsCard({
  label,
  metrics,
  color,
}: TireStatsCardProps) {
  const accentColor = color === "orange" ? "text-orange-400" : "text-blue-400";
  const borderColor =
    color === "orange" ? "border-t-orange-500" : "border-t-blue-500";

  return (
    <div className={`card p-5 border-t-2 ${borderColor} flex-1`}>
      <p className={`section-label mb-4 ${accentColor}`}>{label} Stats</p>
      <StatRow
        label="Overall Diameter"
        value={metrics.overallDiameter.toFixed(2)}
        unit="in"
      />
      <StatRow
        label="Sidewall Height"
        value={metrics.sidewallHeight.toFixed(2)}
        unit="in"
      />
      <StatRow
        label="Circumference"
        value={metrics.circumference.toFixed(2)}
        unit="in"
      />
      <StatRow
        label="Revs / Mile"
        value={metrics.revPerMile.toFixed(0)}
        unit="rev"
      />
    </div>
  );
}
