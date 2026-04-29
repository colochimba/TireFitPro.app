"use client";

import { TireSize } from "@/lib/tireCalculations";

interface TireInputFormProps {
  label: string;
  color: "orange" | "blue";
  tire: TireSize;
  onChange: (tire: TireSize) => void;
}

export default function TireInputForm({
  label,
  color,
  tire,
  onChange,
}: TireInputFormProps) {
  const accentColor =
    color === "orange"
      ? "border-orange-500 text-orange-400"
      : "border-blue-500 text-blue-400";

  const ringColor =
    color === "orange"
      ? "focus:ring-orange-500 focus:border-orange-500"
      : "focus:ring-blue-500 focus:border-blue-500";

  const badgeColor =
    color === "orange"
      ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
      : "bg-blue-500/10 text-blue-400 border-blue-500/30";

  return (
    <div className={`card p-6 border-t-2 ${accentColor} flex-1`}>
      <div className="flex items-center gap-3 mb-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColor} uppercase tracking-wider`}
        >
          {label}
        </span>
      </div>

      {/* Tire size preview badge */}
      <div className="text-center mb-5 py-3 bg-[#0F172A] rounded-xl border border-[#334155]">
        <span className="text-2xl font-black text-white tracking-tight">
          {tire.width || "—"}
          <span className="text-slate-500 text-xl font-medium"> / </span>
          {tire.aspectRatio || "—"}
          <span className="text-slate-500 text-xl font-medium"> R</span>
          {tire.rimDiameter || "—"}
        </span>
      </div>

      <div className="flex gap-2 items-end">
        {/* Width */}
        <div className="flex-1">
          <label className="section-label block mb-2">Width (mm)</label>
          <input
            id={`${label}-width`}
            type="number"
            min={125}
            max={395}
            step={5}
            value={tire.width || ""}
            onChange={(e) =>
              onChange({ ...tire, width: parseFloat(e.target.value) || 0 })
            }
            placeholder="265"
            className={`input-field text-center ${ringColor}`}
          />
        </div>

        {/* Separator */}
        <div className="pb-3 text-slate-600 font-bold text-xl">/</div>

        {/* Aspect Ratio */}
        <div className="flex-1">
          <label className="section-label block mb-2">Aspect (%)</label>
          <input
            id={`${label}-aspect`}
            type="number"
            min={20}
            max={100}
            step={5}
            value={tire.aspectRatio || ""}
            onChange={(e) =>
              onChange({ ...tire, aspectRatio: parseFloat(e.target.value) || 0 })
            }
            placeholder="70"
            className={`input-field text-center ${ringColor}`}
          />
        </div>

        {/* Separator */}
        <div className="pb-3 text-slate-600 font-bold text-xl">R</div>

        {/* Rim Diameter */}
        <div className="flex-1">
          <label className="section-label block mb-2">Rim (in)</label>
          <input
            id={`${label}-rim`}
            type="number"
            min={12}
            max={30}
            step={1}
            value={tire.rimDiameter || ""}
            onChange={(e) =>
              onChange({ ...tire, rimDiameter: parseFloat(e.target.value) || 0 })
            }
            placeholder="17"
            className={`input-field text-center ${ringColor}`}
          />
        </div>
      </div>
    </div>
  );
}
