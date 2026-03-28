import { FAULT_REGISTRY } from './faultRegistry';
import { FaultTypeCode } from './faultRegistry';

export type Complex = { re: number; im: number };

export interface Fault {
  type: FaultTypeCode; // Uses the dynamic keys from your registry (50, 51, L-G, etc.)
  Iabc: number[];
  Vabc?: number[];
  Zload?: Complex;
}

export interface SimResult {
  trip: boolean;
  time: number;
  zone?: string;
  psm?: number;
}

export class RelaySim {
  // IEEE C37.90 / IEC Standard Inverse Curve
  private idmt51(psm: number): number {
    if (psm <= 1.0) return Infinity;
    return 0.14 / (Math.pow(psm, 0.02) - 1);
  }

  // Instantaneous Overcurrent (50)
  private inst50(I: number, pickup: number = 1.5): boolean {
    return I > pickup;
  }

  // Differential Protection (87) - Mason Bias logic
  private diff87(Ia: number, Ib: number, k = 0.2): boolean {
    const Idiff = Math.abs(Ia - Ib);
    const Ibias = (Ia + Ib) / 2;
    return Idiff > k * Ibias;
  }

  // Distance Protection (21) - Mho Characteristic
  private dist21(Z: Complex, Zset = 0.8): string {
    const m = Math.sqrt(Z.re ** 2 + Z.im ** 2);
    if (m < Zset) return 'Zone 1 (Instant)';
    if (m < 1.2 * Zset) return 'Zone 2 (Delayed)';
    return 'Stable';
  }

  public run(fault: Fault): SimResult {
    const Imax = Math.max(...fault.Iabc);
    const psm = Imax / 1.5; // Assuming 1.5pu pickup

    // Default result to prevent UI crashes
    let result: SimResult = { trip: false, time: 0, psm: psm };

    switch (fault.type) {
      case '50':
        result.trip = this.inst50(Imax);
        result.time = result.trip ? 0.05 : 0; // 50ms fixed
        break;

      case '51':
        result.time = this.idmt51(psm);
        result.trip = isFinite(result.time) && result.time < 100;
        break;

      case '87':
        result.trip = this.diff87(fault.Iabc[0], fault.Iabc[1]);
        result.time = result.trip ? 0.03 : 0; // 30ms fixed
        break;

      case '21':
        const z = fault.Zload || { re: 1.0, im: 0.5 };
        const zone = this.dist21(z);
        result.zone = zone;
        result.trip = zone !== 'Stable';
        result.time = zone.includes('Zone 1') ? 0.02 : 0.4;
        break;

      case '27': // Undervoltage
        const Vmin = fault.Vabc ? Math.min(...fault.Vabc) : 1.0;
        result.trip = Vmin < 0.8;
        result.time = result.trip ? 2.0 : 0;
        break;

      // Handle Physical Fault Types (L-G, L-L, L-L-L) as Overcurrent (50/51)
      case 'L-G':
      case 'L-L':
      case 'L-L-L':
        result.trip = this.inst50(Imax, 2.0); // Higher pickup for severe faults
        result.time = result.trip ? 0.01 : 0;
        break;

      default:
        result.trip = false;
        result.time = 0;
    }

    return result;
  }
}
