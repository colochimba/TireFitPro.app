"use client";

import { TireMetrics } from "@/lib/tireCalculations";

interface VisualComparisonProps {
  current: TireMetrics;
  newTire: TireMetrics;
  currentLabel?: string;
  newLabel?: string;
}

export default function VisualComparison({
  current,
  newTire,
  currentLabel = "Current",
  newLabel = "New",
}: VisualComparisonProps) {
  const maxDiameter = Math.max(current.overallDiameter, newTire.overallDiameter);
  const minDiameter = Math.min(current.overallDiameter, newTire.overallDiameter);

  const currentPct = (current.overallDiameter / maxDiameter) * 100;
  const newPct = (newTire.overallDiameter / maxDiameter) * 100;

  // SVG tire circle sizes scaled to canvas
  const svgSize = 260;
  const maxRadius = 110;
  const currentRadius = (current.overallDiameter / maxDiameter) * maxRadius;
  const newRadius = (newTire.overallDiameter / maxDiameter) * maxRadius;

  // Rim radii scaled proportionally
  const rimScaleFactor = maxRadius / maxDiameter;
  // We'll approximate rim as 40% of total tire radius for visual effect
  const currentRimRadius = currentRadius * 0.42;
  const newRimRadius = newRadius * 0.42;

  const diffPct =
    ((newTire.overallDiameter - current.overallDiameter) /
      current.overallDiameter) *
    100;

  return (
    <div className="card p-6">
      <p className="section-label mb-6">Visual Size Comparison</p>

      {/* SVG Tire Visual */}
      <div className="flex items-end justify-center gap-8 mb-8">
        <div className="flex flex-col items-center gap-3">
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="overflow-visible"
          >
            <defs>
              <radialGradient id="currentTireGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
              </radialGradient>
              <radialGradient id="newTireGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FB923C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.8" />
              </radialGradient>
            </defs>

            {/* Overlap zone for comparison */}
            {/* Current tire (blue/slate) */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={currentRadius}
              fill="url(#currentTireGrad)"
              stroke="#64748B"
              strokeWidth="3"
            />
            {/* Current tire center (rim) */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={currentRimRadius}
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Current tire hub */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={currentRimRadius * 0.2}
              fill="#64748B"
            />

            {/* New tire (orange) overlay */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={newRadius}
              fill="url(#newTireGrad)"
              stroke="#F97316"
              strokeWidth="3"
              fillOpacity="0.35"
            />
            {/* New rim */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={newRimRadius}
              fill="#1c1917"
              stroke="#F97316"
              strokeWidth="1.5"
              fillOpacity="0.7"
            />
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500 ring-2 ring-slate-400/50" />
              <span className="text-slate-400">{currentLabel}</span>
              <span className="font-semibold text-white">
                {current.overallDiameter.toFixed(1)}&quot;
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-400/50" />
              <span className="text-slate-400">{newLabel}</span>
              <span className="font-semibold text-white">
                {newTire.overallDiameter.toFixed(1)}&quot;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar comparison */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
              {currentLabel} Tire
            </span>
            <span className="text-sm font-semibold text-white">
              {current.overallDiameter.toFixed(2)}&quot; diameter
            </span>
          </div>
          <div className="h-5 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155]">
            <div
              className="h-full bg-gradient-to-r from-slate-600 to-slate-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${currentPct}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
              {newLabel} Tire
            </span>
            <span className="text-sm font-semibold text-white">
              {newTire.overallDiameter.toFixed(2)}&quot; diameter
            </span>
          </div>
          <div className="h-5 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155]">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${newPct}%` }}
            />
          </div>
        </div>

        {/* Size difference callout */}
        <div className="flex justify-center pt-2">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
              Math.abs(diffPct) <= 3
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : Math.abs(diffPct) <= 6
                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <span>{diffPct >= 0 ? "↑" : "↓"}</span>
            <span>
              {Math.abs(diffPct).toFixed(1)}% {diffPct >= 0 ? "larger" : "smaller"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
