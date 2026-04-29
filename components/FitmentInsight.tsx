"use client";

import { ComparisonResult, FitmentLevel } from "@/lib/tireCalculations";

interface FitmentInsightProps {
  result: ComparisonResult;
}

const fitmentStyles: Record<
  FitmentLevel,
  { bg: string; border: string; icon: string; glow: string }
> = {
  direct: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    icon: "✅",
    glow: "shadow-emerald-500/10",
  },
  minor: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/40",
    icon: "⚠️",
    glow: "shadow-yellow-500/10",
  },
  lift: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/40",
    icon: "🔧",
    glow: "shadow-orange-500/10",
  },
  extreme: {
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    icon: "🚨",
    glow: "shadow-red-500/10",
  },
};

export default function FitmentInsight({ result }: FitmentInsightProps) {
  const style = fitmentStyles[result.fitment];

  // Speedometer display
  const speedError = result.speedometerError;
  const speedSign = speedError >= 0 ? "+" : "";
  const trueSpeed = (60 + speedError).toFixed(1);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Fitment Card */}
      <div
        className={`rounded-2xl border p-6 ${style.bg} ${style.border} shadow-xl ${style.glow}`}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">{style.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {result.fitmentMessage}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {result.fitmentDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Diameter Diff */}
        <div className="metric-card">
          <p className="section-label">Diameter</p>
          <p
            className={`text-2xl font-black ${
              Math.abs(result.diameterDiffPercent) > 5
                ? "text-red-400"
                : Math.abs(result.diameterDiffPercent) > 3
                ? "text-yellow-400"
                : "text-emerald-400"
            }`}
          >
            {result.diameterDiff >= 0 ? "+" : ""}
            {result.diameterDiff.toFixed(2)}&quot;
          </p>
          <p className="text-xs text-slate-500">
            {result.diameterDiff >= 0 ? "+" : ""}
            {result.diameterDiffPercent.toFixed(1)}% difference
          </p>
        </div>

        {/* Speedometer Error */}
        <div className="metric-card">
          <p className="section-label">Speedo @ 60</p>
          <p
            className={`text-2xl font-black ${
              Math.abs(speedError) > 3
                ? "text-red-400"
                : Math.abs(speedError) > 1.5
                ? "text-yellow-400"
                : "text-emerald-400"
            }`}
          >
            {speedSign}
            {speedError.toFixed(1)} mph
          </p>
          <p className="text-xs text-slate-500">
            True speed: {trueSpeed} mph
          </p>
        </div>

        {/* Ground Clearance */}
        <div className="metric-card">
          <p className="section-label">Clearance</p>
          <p
            className={`text-2xl font-black ${
              result.groundClearanceDiff >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {result.groundClearanceDiff >= 0 ? "+" : ""}
            {result.groundClearanceDiff.toFixed(2)}&quot;
          </p>
          <p className="text-xs text-slate-500">Ground clearance change</p>
        </div>

        {/* Circumference Diff */}
        <div className="metric-card">
          <p className="section-label">Circumference</p>
          <p
            className={`text-2xl font-black ${
              result.circumferenceDiff >= 0 ? "text-blue-400" : "text-orange-400"
            }`}
          >
            {result.circumferenceDiff >= 0 ? "+" : ""}
            {result.circumferenceDiff.toFixed(2)}&quot;
          </p>
          <p className="text-xs text-slate-500">Per revolution</p>
        </div>
      </div>
    </div>
  );
}
