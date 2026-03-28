export type FaultTypeCode = '50' | '51' | '50G' | '46' | '49' | '66' | '87T' | '24' | '63' | '87B' | '21' | '67';

export const FAULT_REGISTRY: Record<string, any> = {
  // FEEDER / GENERAL
  "50": { code: "50", name: "Instantaneous Overcurrent", category: "Feeder", explanation: "Trips without intentional delay when current exceeds pickup.", mathContext: "I > I_pickup" },
  "51": { code: "51", name: "Time Overcurrent", category: "Feeder", explanation: "Inverse time delay based on IEEE/IEC curves.", mathContext: "t = TD * (A / (M^p - 1) + B)" },
  "50G": { code: "50G", name: "Ground Instantaneous", category: "Feeder", explanation: "Detects zero-sequence ground faults.", mathContext: "3I0 > Threshold" },

  // MOTOR
  "46": { code: "46", name: "Phase Unbalance", category: "Motor", explanation: "Protects against negative sequence heating.", mathContext: "I2 / I1 > Unbalance %" },
  "49": { code: "49", name: "Thermal Overload", category: "Motor", explanation: "Models machine temperature based on I²t.", mathContext: "θ = (I/I_rated)² * (1 - e^-t/τ)" },
  "66": { code: "66", name: "Starts Per Hour", category: "Motor", explanation: "Prevents thermal stress from repeated starts.", mathContext: "Count > Max_Starts" },

  // TRANSFORMER
  "87T": { code: "87T", name: "Transformer Differential", category: "Transformer", explanation: "Compares primary vs secondary current.", mathContext: "|I_diff| > K * |I_restraint|" },
  "24": { code: "24", name: "Volts Per Hertz", category: "Transformer", explanation: "Overexcitation protection for the core.", mathContext: "V / f > 1.05 pu" },
  "63": { code: "63", name: "Sudden Pressure", category: "Transformer", explanation: "Mechanical pressure relay for internal arcs.", mathContext: "dP/dt > Limit" },

  // BUS & LINE
  "87B": { code: "87B", name: "Bus Differential", category: "Bus", explanation: "High-speed zone protection for the main bus.", mathContext: "ΣI_in == ΣI_out" },
  "21": { code: "21", name: "Distance (Mho)", category: "Line", explanation: "Impedance-based protection for transmission lines.", mathContext: "Z_seen < Z_zone" },
  "67": { code: "67", name: "Directional Overcurrent", category: "Line", explanation: "Only trips for faults in a specific direction.", mathContext: "Angle(V, I) in Trip Zone" }
};


