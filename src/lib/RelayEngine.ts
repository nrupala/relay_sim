// ANSI/IEEE Standard Inverse Time Curve Calculation
// Time = TD * [ (A / (M^p - 1)) + B ]
export const IEEE_CURVES = {
  U_INVERSE: { A: 0.0515, B: 0.1140, p: 0.02 },
  V_INVERSE: { A: 19.61, B: 0.491, p: 2.0 },
  E_INVERSE: { A: 28.2, B: 0.1217, p: 2.0 },
};

export class RelayEngine {
  calculateTrip(fault: any, settings: any) {
    const { Iabc, type } = fault;
    const maxI = Math.max(...Iabc);
    const pickup = settings.pickup || 1.5;
    const M = maxI / pickup; // Multiple of Pickup

    if (M <= 1) return { trip: false, time: Infinity };

    switch (type) {
      case '50': // Instantaneous
        return { trip: M > settings.instSet, time: 0.016 }; // 1 Cycle
      case '51': // Time Overcurrent
        const { A, B, p } = IEEE_CURVES.V_INVERSE;
        const time = settings.TD * (A / (Math.pow(M, p) - 1) + B);
        return { trip: true, time };
      case '46': // Phase Unbalance (Motor)
        const unbalance = (maxI - (Iabc.reduce((a, b) => a + b) / 3)) / maxI;
        return { trip: unbalance > 0.15, time: 0.5 };
      default:
        return { trip: false, time: 0 };
    }
  }
}
