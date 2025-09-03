import { BaseRepository } from "../util/BaseRepository";
import { SellDescriptionProduct } from "../models/SellDescriptionProduct";

export class SellDescriptionProductRepository extends BaseRepository<SellDescriptionProduct> {
  constructor() {
    super(SellDescriptionProduct);
  }
  
  // Métodos específicos para SellDescriptionProduct
//   async findBySellId(sellId: number): Promise<SellDescriptionProduct[]> {
//     return this.repository.find({
//       where: { sellId }
//     });
//   }
  
  async findByProductId(productId: number): Promise<SellDescriptionProduct[]> {
    return this.repository.find({
      where: { productId }
    });
  }
}