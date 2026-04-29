"use client";

import { PRESET_TIRES, TireSize } from "@/lib/tireCalculations";

interface PresetSelectorProps {
  onSelect: (current: TireSize, newTire: TireSize) => void;
}

export default function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="card p-5">
      <p className="section-label mb-4">Quick Presets</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRESET_TIRES.map((preset, i) => (
          <button
            key={i}
            onClick={() => onSelect(preset.current, preset.newTire)}
            className="group p-3 bg-[#0F172A] hover:bg-orange-500/10 border border-[#334155] hover:border-orange-500/50
                       rounded-xl text-left transition-all duration-200 cursor-pointer"
          >
            <p className="text-xs font-semibold text-slate-300 group-hover:text-orange-400 transition-colors mb-1 leading-tight">
              {preset.label}
            </p>
            <p className="text-[11px] text-slate-600 group-hover:text-slate-400 transition-colors">
              {preset.current.width}/{preset.current.aspectRatio}R
              {preset.current.rimDiameter} →{" "}
              {preset.newTire.width}/{preset.newTire.aspectRatio}R
              {preset.newTire.rimDiameter}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
