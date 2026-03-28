//data module to store the fault codes in a structured format. This makes them easily importable
export interface FaultCode {
  id: string;
  description: string;
  category: 'Fault Type' | 'ANSI Device';
}

export const faultCodes: FaultCode[] = [
  { id: "L-G", description: "Single Line-to-Ground", category: "Fault Type" },
  { id: "L-L", description: "Line-to-Line", category: "Fault Type" },
  { id: "L-L-G", description: "Double Line-to-Ground", category: "Fault Type" },
  { id: "L-L-L", description: "Three-Phase Symmetrical", category: "Fault Type" },
  { id: "50", description: "Instantaneous Overcurrent", category: "ANSI Device" },
  { id: "51", description: "AC Time Overcurrent", category: "ANSI Device" },
  { id: "27", description: "Undervoltage", category: "ANSI Device" },
  { id: "87", description: "Differential Protection", category: "ANSI Device" }
];
