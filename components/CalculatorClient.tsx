"use client";

import { useState, useMemo } from "react";
import TireInputForm from "@/components/TireInputForm";
import TireStatsCard from "@/components/TireStatsCard";
import FitmentInsight from "@/components/FitmentInsight";
import VisualComparison from "@/components/VisualComparison";
import PresetSelector from "@/components/PresetSelector";
import {
  TireSize,
  compareTires,
  calculateTireMetrics,
} from "@/lib/tireCalculations";

const DEFAULT_CURRENT: TireSize = { width: 265, aspectRatio: 70, rimDiameter: 17 };
const DEFAULT_NEW: TireSize = { width: 285, aspectRatio: 75, rimDiameter: 17 };

function isValidTire(tire: TireSize): boolean {
  return (
    tire.width > 0 &&
    tire.aspectRatio > 0 &&
    tire.rimDiameter > 0 &&
    tire.width >= 125 &&
    tire.width <= 395 &&
    tire.aspectRatio >= 20 &&
    tire.aspectRatio <= 100 &&
    tire.rimDiameter >= 12 &&
    tire.rimDiameter <= 30
  );
}

export default function CalculatorClient() {
  const [currentTire, setCurrentTire] = useState<TireSize>(DEFAULT_CURRENT);
  const [newTire, setNewTire] = useState<TireSize>(DEFAULT_NEW);

  const isValid = isValidTire(currentTire) && isValidTire(newTire);

  const result = useMemo(() => {
    if (!isValid) return null;
    return compareTires(currentTire, newTire);
  }, [currentTire, newTire, isValid]);

  const currentMetrics = useMemo(() => {
    if (!isValidTire(currentTire)) return null;
    return calculateTireMetrics(currentTire);
  }, [currentTire]);

  const newMetrics = useMemo(() => {
    if (!isValidTire(newTire)) return null;
    return calculateTireMetrics(newTire);
  }, [newTire]);

  const handlePreset = (current: TireSize, newT: TireSize) => {
    setCurrentTire(current);
    setNewTire(newT);
  };

  const handleReset = () => {
    setCurrentTire(DEFAULT_CURRENT);
    setNewTire(DEFAULT_NEW);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-orange-400 text-sm font-semibold tracking-wide">
            Instant Results • No Registration Required
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Tire Size{" "}
          <span className="text-orange-500">Calculator</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Compare two tire sizes and instantly see the difference in diameter,
          speedometer accuracy, ground clearance, and whether they&apos;ll fit
          your vehicle.
        </p>
      </div>

      {/* Preset Selector */}
      <PresetSelector onSelect={handlePreset} />

      {/* Input Forms */}
      <section aria-label="Tire size inputs">
        <div className="flex flex-col sm:flex-row gap-4">
          <TireInputForm
            label="Current Tire"
            color="blue"
            tire={currentTire}
            onChange={setCurrentTire}
          />
          {/* Swap / VS divider */}
          <div className="flex sm:flex-col items-center justify-center gap-2 sm:py-6">
            <div className="hidden sm:block w-px h-full bg-[#334155] flex-1" />
            <div className="flex sm:flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-500 font-bold text-xs">
                VS
              </div>
              <button
                onClick={() => {
                  setCurrentTire(newTire);
                  setNewTire(currentTire);
                }}
                title="Swap tires"
                className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] hover:border-orange-500/50 hover:bg-orange-500/10
                           flex items-center justify-center text-slate-500 hover:text-orange-400 transition-all duration-200 cursor-pointer"
              >
                ⇄
              </button>
            </div>
            <div className="hidden sm:block w-px h-full bg-[#334155] flex-1" />
          </div>
          <TireInputForm
            label="New Tire"
            color="orange"
            tire={newTire}
            onChange={setNewTire}
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            Reset to defaults
          </button>
        </div>
      </section>

      {/* Results Section */}
      {!isValid && (
        <div className="text-center py-10 text-slate-600">
          <svg
            className="w-12 h-12 mx-auto mb-3 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-slate-500 text-sm">
            Enter valid tire sizes above to see results
          </p>
        </div>
      )}

      {result && currentMetrics && newMetrics && (
        <div className="space-y-6 animate-fade-in">
          {/* Fitment Verdict */}
          <section aria-label="Fitment analysis">
            <h2 className="section-label mb-3">Fitment Analysis</h2>
            <FitmentInsight result={result} />
          </section>

          {/* Individual Tire Stats */}
          <section aria-label="Individual tire statistics">
            <h2 className="section-label mb-3">Individual Tire Stats</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <TireStatsCard
                label="Current"
                metrics={currentMetrics}
                color="blue"
              />
              <TireStatsCard
                label="New"
                metrics={newMetrics}
                color="orange"
              />
            </div>
          </section>

          {/* Visual Comparison */}
          <section aria-label="Visual tire size comparison">
            <h2 className="section-label mb-3">Visual Comparison</h2>
            <VisualComparison
              current={currentMetrics}
              newTire={newMetrics}
              currentLabel={`${currentTire.width}/${currentTire.aspectRatio}R${currentTire.rimDiameter}`}
              newLabel={`${newTire.width}/${newTire.aspectRatio}R${newTire.rimDiameter}`}
            />
          </section>

          {/* Disclaimer */}
          <div className="text-xs text-slate-600 text-center py-2 px-4 bg-[#1E293B]/50 rounded-xl border border-[#334155]/50">
            ⚠️ Results are for reference only. Actual fitment depends on your specific vehicle, suspension, and wheel offset. Always verify with a professional.
          </div>
        </div>
      )}

      {/* FAQ / How it works */}
      <section aria-label="How tire size comparison works" className="pt-6">
        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            How Tire Size Comparison Works
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">
                📐 Understanding Tire Numbers
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A tire marked <strong className="text-white">265/70R17</strong>{" "}
                means: 265mm wide, 70% aspect ratio (sidewall is 70% of width),
                fits a 17-inch rim. The overall diameter is calculated from
                these three numbers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">
                🎯 Speedometer Error
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A larger tire travels further per revolution, making your
                speedometer read lower than actual speed. A smaller tire does
                the opposite. Our tool shows the exact mph offset.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">
                🔧 Fitment Thresholds
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Under 3% diameter difference = direct fit. 3–5% = may need
                minor trimming. 5–8% = lift kit recommended. Over 8% = major
                modifications required for safe operation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">
                ⚡ Ground Clearance
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ground clearance increases by half the diameter difference. A
                tire 1 inch larger in diameter gives you 0.5 inches of extra
                ground clearance — great for off-road use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
