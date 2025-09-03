import { BaseRepository } from "../util/BaseRepository";
import { Coupons } from "../models/Coupons";

export class CouponsRepository extends BaseRepository<Coupons> {
  constructor() {
    super(Coupons);
  }
  
  async findByCode(code: string): Promise<Coupons | null> {
    return this.repository.findOne({
      where: { code }
    });
  }
  
  async findActive(): Promise<Coupons[]> {
    return this.repository.find({
      where: { status: true }
    });
  }
  
//   async findValidCoupons(): Promise<Coupons[]> {
//     const today = new Date();
//     return this.repository.find({
//       where: [
//         { expirationDate: null, active: true },
//         { expirationDate: MoreThan(today), active: true }
//       ]
//     });
//   }
}