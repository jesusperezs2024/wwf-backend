import { BaseRepository } from "../util/BaseRepository";
import { SectionItems } from "../models/SectionItems";

export class SectionItemsRepository extends BaseRepository<SectionItems> {
  constructor() {
    super(SectionItems);
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