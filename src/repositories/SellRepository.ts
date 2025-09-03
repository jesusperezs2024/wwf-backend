import { BaseRepository } from "../util/BaseRepository";
import { Sell } from "../models/Sell";

export class SellRepository extends BaseRepository<Sell> {
  constructor() {
    super(Sell);
  }
  
  // Métodos específicos para Sell
//   async findByCustomerId(customerId: number): Promise<Sell[]> {
//     return this.repository.find({
//       where: { customerId }
//     });
//   }
  
  async findByStatus(status: string): Promise<Sell[]> {
    return this.repository.find({
      where: { status }
    });
  }
  
//   async findByDateRange(startDate: Date, endDate: Date): Promise<Sell[]> {
//     return this.repository.find({
//       where: {
//         createdAt: {
//           $gte: startDate,
//           $lte: endDate
//         }
//       }
//     });
//   }
}