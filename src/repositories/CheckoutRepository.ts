import { BaseRepository } from "../util/BaseRepository";
import { Checkout } from "../models/Checkout";

export class CheckoutRepository extends BaseRepository<Checkout> {
  constructor() {
    super(Checkout);
  }
  
  async findByStatus(status: string): Promise<Checkout[]> {
    return this.repository.find({
      where: { status }
    });
  }
  
  async findByUserId(userId: number): Promise<Checkout[]> {
    return this.repository.find({
      where: { userId }
    });
  }
}