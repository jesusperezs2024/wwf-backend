import { BaseRepository } from "../util/BaseRepository";
import { Category } from "../models/Category";

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }
  
  async findByName(name: string): Promise<Category[]> {
    return this.repository.find({
      where: { name }
    });
  } 
  
}