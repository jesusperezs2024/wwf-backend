import { BaseRepository } from "../util/BaseRepository";
import { SectionCards } from "../models/SectionCards";

export class SectionCardsRepository extends BaseRepository<SectionCards> {
  constructor() {
    super(SectionCards);
  }
  
//   async findActive(): Promise<SectionCards[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionCards[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}