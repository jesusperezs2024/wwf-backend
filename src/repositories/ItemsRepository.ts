import { BaseRepository } from "../util/BaseRepository";
import { Items } from "../models/Items";

export class ItemsRepository extends BaseRepository<Items> {
  constructor() {
    super(Items);
  }
  
  async findByItemsId(itemsId: number): Promise<Items[]> {
    return this.repository.find({
      where: { itemsId }
    });
  }
  
  async findBySectionItemsId(sectionId: number): Promise<Items[]> {
    return this.repository.find({
      where: { sectionItemsId: sectionId }
    });
  }
}