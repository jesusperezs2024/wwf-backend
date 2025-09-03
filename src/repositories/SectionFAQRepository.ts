import { BaseRepository } from "../util/BaseRepository";
import { SectionFAQ } from "../models/SectionFAQ";

export class SectionFAQRepository extends BaseRepository<SectionFAQ> {
  constructor() {
    super(SectionFAQ);
  }
  
//   async findActive(): Promise<SectionFAQ[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionFAQ[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}