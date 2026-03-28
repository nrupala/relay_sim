# Usage:define your fault codes in a structured format that can be easily mapped to your simulation engine.

export interface FaultEntry {
  code: string;
  description: string;
  category: 'ANSI_DEVICE' | 'FAULT_TYPE';
}

export const powerSystemFaults: FaultEntry[] = [
  // Common Fault Types
  { code: "L-G", description: "Single Line-to-Ground Fault", category: "FAULT_TYPE" },
  { code: "L-L", description: "Line-to-Line Fault", category: "FAULT_TYPE" },
  { code: "L-L-G", description: "Double Line-to-Ground Fault", category: "FAULT_TYPE" },
  { code: "L-L-L", description: "Three-Phase (Symmetrical) Fault", category: "FAULT_TYPE" },
  
  // IEEE Standard Device Numbers (ANSI)
  { code: "27", description: "Undervoltage Relay", category: "ANSI_DEVICE" },
  { code: "50", description: "Instantaneous Overcurrent Relay", category: "ANSI_DEVICE" },
  { code: "51", description: "AC Time Overcurrent Relay", category: "ANSI_DEVICE" },
  { code: "59", description: "Overvoltage Relay", category: "ANSI_DEVICE" },
  { code: "64", description: "Ground Detector Relay", category: "ANSI_DEVICE" },
  { code: "87", description: "Differential Protective Relay", category: "ANSI_DEVICE" }
];