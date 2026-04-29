export interface TireSize {
  width: number;       // mm
  aspectRatio: number; // %
  rimDiameter: number; // inches
}

export interface TireMetrics {
  sidewallHeight: number;   // inches
  overallDiameter: number;  // inches
  circumference: number;    // inches
  revPerMile: number;
}

export interface ComparisonResult {
  current: TireMetrics;
  newTire: TireMetrics;
  diameterDiff: number;        // inches
  diameterDiffPercent: number; // %
  circumferenceDiff: number;   // inches
  speedometerError: number;    // mph at 60mph indicated
  groundClearanceDiff: number; // inches (radius diff)
  fitment: FitmentLevel;
  fitmentMessage: string;
  fitmentDescription: string;
}

export type FitmentLevel = "direct" | "minor" | "lift" | "extreme";

const MM_TO_INCHES = 0.0393701;

export function calculateTireMetrics(tire: TireSize): TireMetrics {
  const sidewallMm = tire.width * (tire.aspectRatio / 100);
  const sidewallInches = sidewallMm * MM_TO_INCHES;
  const overallDiameter = tire.rimDiameter + 2 * sidewallInches;
  const circumference = Math.PI * overallDiameter;
  const revPerMile = (5280 * 12) / circumference; // 63360 inches per mile

  return {
    sidewallHeight: sidewallInches,
    overallDiameter,
    circumference,
    revPerMile,
  };
}

function getFitmentLevel(diameterDiffPercent: number): {
  level: FitmentLevel;
  message: string;
  description: string;
} {
  const abs = Math.abs(diameterDiffPercent);

  if (abs <= 1) {
    return {
      level: "direct",
      message: "✅ Direct Fit",
      description:
        "This tire size is virtually identical to your current setup. No modifications needed — bolt on and go.",
    };
  } else if (abs <= 3) {
    return {
      level: "direct",
      message: "✅ Direct Fit",
      description:
        "Minimal size difference. In most cases this is a direct bolt-on upgrade with no modifications needed.",
    };
  } else if (abs <= 5) {
    return {
      level: "minor",
      message: "⚠️ May Require Minor Trimming",
      description:
        "Moderate size difference. Some vehicles may need minor plastic trim adjustments or small spacers. Check for rubbing at full lock before driving.",
    };
  } else if (abs <= 8) {
    return {
      level: "lift",
      message: "🔧 Lift Recommended",
      description:
        "Significant size increase. A lift kit (1–3 inches) is strongly recommended to prevent rubbing. Gear recalibration may also be needed for optimal performance.",
    };
  } else {
    return {
      level: "extreme",
      message: "🚨 Major Modifications Required",
      description:
        "Very large size difference. Extensive modifications required: lift kit, wheel spacers, fender flares and possible frame modification. For off-road builds only.",
    };
  }
}

export function compareTires(
  current: TireSize,
  newTire: TireSize
): ComparisonResult {
  const currentMetrics = calculateTireMetrics(current);
  const newMetrics = calculateTireMetrics(newTire);

  const diameterDiff = newMetrics.overallDiameter - currentMetrics.overallDiameter;
  const diameterDiffPercent =
    (diameterDiff / currentMetrics.overallDiameter) * 100;

  const circumferenceDiff = newMetrics.circumference - currentMetrics.circumference;

  // Speedometer shows 60 mph. True speed = 60 * (new tire circumference / current tire circumference)
  const trueSpeed = 60 * (newMetrics.circumference / currentMetrics.circumference);
  const speedometerError = trueSpeed - 60; // positive = speeding, negative = slower

  const groundClearanceDiff =
    (newMetrics.overallDiameter - currentMetrics.overallDiameter) / 2;

  const { level, message, description } = getFitmentLevel(diameterDiffPercent);

  return {
    current: currentMetrics,
    newTire: newMetrics,
    diameterDiff,
    diameterDiffPercent,
    circumferenceDiff,
    speedometerError,
    groundClearanceDiff,
    fitment: level,
    fitmentMessage: message,
    fitmentDescription: description,
  };
}

export function formatInches(val: number, decimals = 2): string {
  return `${val >= 0 ? "+" : ""}${val.toFixed(decimals)}"`;
}

export function formatDiameter(val: number): string {
  return `${val.toFixed(2)}"`;
}

export const PRESET_TIRES: { label: string; current: TireSize; newTire: TireSize }[] = [
  {
    label: "Stock → Light Upgrade",
    current: { width: 265, aspectRatio: 70, rimDiameter: 17 },
    newTire: { width: 285, aspectRatio: 75, rimDiameter: 17 },
  },
  {
    label: "Sport Sedan",
    current: { width: 225, aspectRatio: 45, rimDiameter: 18 },
    newTire: { width: 245, aspectRatio: 40, rimDiameter: 18 },
  },
  {
    label: "Truck Lift Build",
    current: { width: 265, aspectRatio: 65, rimDiameter: 18 },
    newTire: { width: 315, aspectRatio: 70, rimDiameter: 18 },
  },
  {
    label: "Crossover Stock",
    current: { width: 235, aspectRatio: 60, rimDiameter: 18 },
    newTire: { width: 245, aspectRatio: 65, rimDiameter: 17 },
  },
];
