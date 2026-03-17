export type Complex = {re: number; im: number};
export interface Fault {type: '50'|'51'|'21'|'87'; Iabc: number[]; Vabc?: number[]; Zload?: Complex};
export class RelaySim {
  idmt51(psm: number): number { return 0.14 / (Math.pow(psm, 0.02) - 1); }
  inst50(I: number, Ip: number = 1.5): boolean { return I > Ip; }
  diff87(Ir: number, Is: number, k=0.2): boolean { return Ir > Is + k*(Ir+Is); }
  dist21(Z: Complex, Zset=0.8): string { 
    let m = Math.sqrt(Z.re**2 + Z.im**2); 
    return m < Zset ? 'Z1' : m < 1.2*Zset ? 'Z2' : 'No'; 
  }
  run(fault: Fault): {trip: boolean; time: number; zone?: string} {
    const Imax = Math.max(...fault.Iabc); 
    const psm = Imax / 1.5;
    const Ir = Math.abs(fault.Iabc[0] - fault.Iabc[1]);
    const trip50 = this.inst50(Imax); 
    const t51 = this.idmt51(psm); 
    const trip87 = this.diff87(Ir, Imax);
    return fault.type === '21' ? 
      {trip: true, time: 0, zone: this.dist21(fault.Zload!)} : 
      {trip: trip50 || trip87, time: t51};
  }
}
