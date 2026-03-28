// list of faults 
export interface FaultInfo {
  code: string;
  name: string;
  desc: string;
  category: 'ANSI Device' | 'Fault Type';
}

export const FAULT_REGISTRY: Record<string, FaultInfo> = {
  // ANSI Protection Functions
  '50': { code: '50', name: 'Instantaneous Overcurrent', desc: 'Trips immediately if I > 1.5pu', category: 'ANSI Device' },
  '51': { code: '51', name: 'AC Time Overcurrent', desc: 'Inverse time delay (IEC VI curve)', category: 'ANSI Device' },
  '87': { code: '87', name: 'Differential Protection', desc: 'Trips on Mason Bias mismatch (Ia-Ib)', category: 'ANSI Device' },
  '21': { code: '21', name: 'Distance Protection', desc: 'Trips on impedance Z < Reach', category: 'ANSI Device' },
  '27': { code: '27', name: 'Undervoltage', desc: 'Trips if voltage drops below 0.8pu', category: 'ANSI Device' },
  
  // Physical Fault Types
  'L-G': { code: 'L-G', name: 'Single Line-to-Ground', desc: 'One phase conductor touches earth', category: 'Fault Type' },
  'L-L': { code: 'L-L', name: 'Line-to-Line', desc: 'Two phases short-circuiting', category: 'Fault Type' },
  'L-L-L': { code: 'L-L-L', name: 'Three-Phase Symmetrical', desc: 'All phases shorted (Highest Severity)', category: 'Fault Type' }
};

export type FaultTypeCode = keyof typeof FAULT_REGISTRY;
