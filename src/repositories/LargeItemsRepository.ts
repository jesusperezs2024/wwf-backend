import { BaseRepository } from "../util/BaseRepository";
import { LargeItems } from "../models/LargeItems";

export class LargeItemsRepository extends BaseRepository<LargeItems> {
  constructor() {
    super(LargeItems);
  }
   
  
  async findBySectionLargeItemsId(sectionId: number): Promise<LargeItems[]> {
    return this.repository.find({
      where: { sectionLargeItemsId: sectionId }
    });
  }
}