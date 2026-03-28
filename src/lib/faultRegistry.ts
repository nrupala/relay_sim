export interface FaultInfo {
  code: string;
  name: string;
  category: 'ANSI Device' | 'Fault Type';
  explanation: string;
  mathContext: string;
  targetEquipment: string[]; // New: motor, transformer, line, etc.
  source: string;
}

export const FAULT_REGISTRY: Record<string, FaultInfo> = {
  '50/51': {
    code: '50/51', name: 'Overcurrent (Phase)', category: 'ANSI Device',
    targetEquipment: ['Line', 'Motor', 'Transformer'],
    explanation: 'Detects currents exceeding safe limits. In motors, it protects against "Locked Rotor" conditions.',
    mathContext: 'Motor Start: $I_{start} \approx 6 \times I_{rated}$. Relay must "dwell" during start.',
    source: 'IEEE C37.96 (Motor Protection Guide)'
  },
  '87T': {
    code: '87T', name: 'Transformer Differential', category: 'ANSI Device',
    targetEquipment: ['Transformer'],
    explanation: 'Protects against internal winding shorts. It uses "Harmonic Restraint" to avoid tripping on magnetizing inrush.',
    mathContext: 'Restraint: 2nd Harmonic > 15% indicates inrush, NOT a fault.',
    source: 'Mason: Art & Science of Protective Relaying'
  },
  '27/59': {
    code: '27/59', name: 'Under/Over Voltage', category: 'ANSI Device',
    targetEquipment: ['VFD', 'Motor', 'Generator'],
    explanation: 'Crucial for VFDs. High DC bus voltage (Overvoltage) can explode capacitors.',
    mathContext: 'VFD Trip: Usually $>110\%$ or $<90\%$ of rated bus voltage.',
    source: 'Industrial VFD Troubleshooting (Megger/ABB)'
  },
  '46': {
    code: '46', name: 'Negative Sequence', category: 'ANSI Device',
    targetEquipment: ['Generator', 'Motor'],
    explanation: 'Detects "Single Phasing." Unbalanced currents cause intense rotor heating.',
    mathContext: '$I_2$ heating: $K = I_2^2 \cdot t$. Detects phase loss before the motor burns.',
    source: 'IEEE C37.102 (Generator Protection)'
  },
  '21': {
    code: '21', name: 'Distance (Mho)', category: 'ANSI Device',
    targetEquipment: ['Line'],
    explanation: 'Primary protection for long lines. Ignores load, focuses on "Reach" distance.',
    mathContext: 'Zone 1: 80% of Line Impedance. Instantaneous trip.',
    source: 'Anderson: Power System Protection'
  },
  '63': {
    code: '63', name: 'Buchholz / Gas Pressure', category: 'ANSI Device',
    targetEquipment: ['Transformer'],
    explanation: 'A mechanical relay that detects gas bubbles caused by oil breakdown during internal arcing.',
    mathContext: 'Mechanical: Not vector-based. Detects dielectric breakdown.',
    source: 'Standard Handbook for Electrical Engineers'
  }
};

export type FaultTypeCode = keyof typeof FAULT_REGISTRY;
