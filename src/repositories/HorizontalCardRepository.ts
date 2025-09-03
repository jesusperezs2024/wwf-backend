import { BaseRepository } from "../util/BaseRepository";
import { HorizontalCard } from "../models/HorizontalCard";

export class HorizontalCardRepository extends BaseRepository<HorizontalCard> {
  constructor() {
    super(HorizontalCard);
  }
  
//   async findByType(type: string): Promise<HorizontalCard[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
  
  async findBySectionHorizontalCardId(sectionId: number): Promise<HorizontalCard[]> {
    return this.repository.find({
      where: { sectionHorizontalCardId: sectionId }
    });
  }
}