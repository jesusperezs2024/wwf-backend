import { BaseRepository } from "../util/BaseRepository";
import { Cards } from "../models/Cards";

export class CardsRepository extends BaseRepository<Cards> {
  constructor() {
    super(Cards);
  }
  
  async findByCategory(categoryId: number): Promise<Cards[]> {
    return this.repository.find({
      where: { id : categoryId }
    });
  }
 
}