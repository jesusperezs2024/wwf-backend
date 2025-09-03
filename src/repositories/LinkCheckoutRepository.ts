import { BaseRepository } from "../util/BaseRepository";
import { LinkCheckout } from "../models/LinkCheckout";

export class LinkCheckoutRepository extends BaseRepository<LinkCheckout> {
  constructor() {
    super(LinkCheckout);
  }
  
//   async findByCode(code: string): Promise<LinkCheckout | null> {
//     return this.repository.findOne({
//       where: { code }
//     });
//   }
  
  async findByCheckoutId(checkoutId: number): Promise<LinkCheckout[]> {
    return this.repository.find({
      where: { checkoutId }
    });
  }
  
//   async findActive(): Promise<LinkCheckout[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
}