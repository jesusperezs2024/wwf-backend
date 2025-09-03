import { BaseRepository } from "../util/BaseRepository";
import { SectionLargeItems } from "../models/SectionLargeItems";

export class SectionLargeItemsRepository extends BaseRepository<SectionLargeItems> {
  constructor() {
    super(SectionLargeItems);
  }
  
//   async findActive(): Promise<SectionItems[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionItems[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}