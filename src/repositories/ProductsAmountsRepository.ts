import { BaseRepository } from "../util/BaseRepository";
import { ProductsAmounts } from "../models/ProductsAmounts";

export class ProductsAmountsRepository extends BaseRepository<ProductsAmounts> {
  constructor() {
    super(ProductsAmounts);
  }
  
//   async findByProductId(productId: number): Promise<ProductsAmounts[]> {
//     return this.repository.find({
//       where: { productId }
//     });
//   }
  
//   async findActive(): Promise<ProductsAmounts[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
}