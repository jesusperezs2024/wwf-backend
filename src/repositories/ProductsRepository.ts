import { BaseRepository } from "../util/BaseRepository";
import { Products } from "../models/Products";

export class ProductsRepository extends BaseRepository<Products> {
  constructor() {
    super(Products);
  }
  
//   async findByCategory(categoryId: number): Promise<Products[]> {
//     return this.repository.find({
//       where: { categoryId }
//     });
//   }
  
//   async findActive(): Promise<Products[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findBySlug(slug: string): Promise<Products | null> {
//     return this.repository.findOne({
//       where: { slug }
//     });
//   }
}