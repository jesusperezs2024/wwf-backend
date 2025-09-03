import { BaseRepository } from "../util/BaseRepository";
import { SectionHorizontalCard } from "../models/SectionHorizontalCard";

export class SectionHorizontalCardRepository extends BaseRepository<SectionHorizontalCard> {
  constructor() {
    super(SectionHorizontalCard);
  }
  
//   async findActive(): Promise<SectionHorizontalCard[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionHorizontalCard[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}