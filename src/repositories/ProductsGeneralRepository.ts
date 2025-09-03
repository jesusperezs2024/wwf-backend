import { BaseRepository } from "../util/BaseRepository";
import { ProductsGeneral } from "../models/ProductsGeneral";

export class ProductsGeneralRepository extends BaseRepository<ProductsGeneral> {
  constructor() {
    super(ProductsGeneral);
  }
  
  async findByProductId(productId: number): Promise<ProductsGeneral | null> {
    return this.repository.findOne({
      where: { productId }
    });
  }
}