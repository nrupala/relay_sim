// src/data/voltageLevels.ts
// Standard system voltage classes per equipment type (kV).
//
// Line: ANSI HV/EHV classes + 240 kV (AESO/Alberta bulk system).
// Bus: distribution + subtransmission + HV bus levels (distribution buses
//   live at 4.16–25 kV, transmission buses at 34.5–230 kV).
// Transformer: HV winding classes. Motor: LV utilization + MV/IEC classes
//   (600 V first = Canadian 600Y/347V, 480 V = US 480Y/277V).

export const VOLTAGE_LEVELS: Record<string, number[]> = {
  motor: [0.48, 0.6, 4.16, 6.6, 13.8],
  transformer: [13.8, 25, 34.5, 69, 138, 230],
  bus: [4.16, 6.9, 11, 12.47, 13.8, 25, 34.5, 69, 138, 230],
  line: [115, 138, 230, 240, 345, 500],
};

export const DEFAULT_VOLTAGE: Record<string, number> = {
  motor: 4.16,
  transformer: 13.8,
  bus: 13.8,
  line: 115,
};

export const formatVoltage = (kv: number): string =>
  kv < 1 ? `${Math.round(kv * 1000)} V` : `${kv} kV`;

// Motor frame size follows the voltage class (display label only —
// the engine works in per-unit, so protection behavior is unchanged).
export const motorRating = (kv: number): string => (kv <= 0.6 ? '200 HP' : '500 HP');
