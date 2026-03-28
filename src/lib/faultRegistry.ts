export interface FaultInfo {
  code: string;
  name: string;
  desc: string;
  category: 'ANSI Device' | 'Fault Type';
  explanation: string;
  mathContext: string;
  source?: string;
}

export const FAULT_REGISTRY: Record<string, FaultInfo> = {
  // ANSI Protection Functions
  '21': {
    code: '21', name: 'Distance (Mho)', category: 'ANSI Device',
    desc: 'Trips based on Impedance (V/I)',
    explanation: 'Protects transmission lines by monitoring the ratio of V/I. If the impedance (Z) drops below a set "reach," a fault is detected.',
    mathContext: 'Logic: $Z_{measured} < Z_{set}$. Zone 1 is usually 80% of line length.',
    source: 'IEEE C37.2 / Anderson Power System Protection'
  },
  '27': {
    code: '27', name: 'Undervoltage', category: 'ANSI Device',
    desc: 'Trips if Voltage < 0.80pu',
    explanation: 'Detects a collapse in system voltage. Critical for preventing induction motor stalling and protecting sensitive electronics.',
    mathContext: 'Logic: $min(V_a, V_b, V_c) < V_{threshold}$.',
    source: 'IEEE C37.2'
  },
  '50': {
    code: '50', name: 'Instantaneous Overcurrent', category: 'ANSI Device',
    desc: 'Immediate trip for high-magnitude faults',
    explanation: 'A non-delayed protection meant for severe short circuits close to the source.',
    mathContext: 'Logic: $I_{max} > I_{pickup}$. Operating time typically < 50ms.',
    source: 'IEC 60255 / IEEE C37.90'
  },
  '51': {
    code: '51', name: 'AC Time Overcurrent', category: 'ANSI Device',
    desc: 'Inverse time delay (IDMT)',
    explanation: 'The most common protection. The trip time decreases as the current increases, allowing for coordination with downstream fuses.',
    mathContext: 'Formula: $t = 0.14 / (PSM^{0.02} - 1)$ (IEC Very Inverse).',
    source: 'IEC 60255 Standards'
  },
  '87': {
    code: '87', name: 'Differential Protection', category: 'ANSI Device',
    desc: 'Unit protection for transformers/busbars',
    explanation: 'Compares current entering and leaving a zone. If they don\'t match (Kirchhoff\'s Law), an internal fault is present.',
    mathContext: 'Logic: $|I_{in} - I_{out}| > k \cdot \frac{I_{in} + I_{out}}{2}$.',
    source: 'Mason\'s Art and Science of Protective Relaying'
  },

  // Physical Fault Types
  'L-G': {
    code: 'L-G', name: 'Single Line-to-Ground', category: 'Fault Type',
    desc: 'Phase-to-Earth contact',
    explanation: 'The most common fault (70-80% of cases). Occurs when one conductor touches a grounded object (tree, pole, etc.).',
    mathContext: 'Calculated using Zero Sequence components ($3I_0$).',
    source: 'Standard Handbook for Electrical Engineers'
  },
  'L-L': {
    code: 'L-L', name: 'Line-to-Line', category: 'Fault Type',
    desc: 'Contact between two phases',
    explanation: 'Occurs when two conductors touch, often due to high winds or insulator failure. Does not involve ground.',
    mathContext: 'Results in high Negative Sequence ($I_2$) currents.',
    source: 'Standard Handbook for Electrical Engineers'
  },
  'L-L-L': {
    code: 'L-L-L', name: 'Three-Phase Symmetrical', category: 'Fault Type',
    desc: 'All phases shorted together',
    explanation: 'The most severe but rarest fault (~5%). Used to calculate the maximum "Short Circuit MVA" of a system.',
    mathContext: 'Balanced fault; only Positive Sequence ($I_1$) exists.',
    source: 'Standard Handbook for Electrical Engineers'
  }
};

export type FaultTypeCode = keyof typeof FAULT_REGISTRY;