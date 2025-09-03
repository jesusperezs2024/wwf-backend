import { BaseRepository } from "../util/BaseRepository";
import { SectionBanner } from "../models/SectionBanner";

export class SectionBannerRepository extends BaseRepository<SectionBanner> {
  constructor() {
    super(SectionBanner);
  }
  
//   async findActive(): Promise<SectionBanner[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionBanner[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}