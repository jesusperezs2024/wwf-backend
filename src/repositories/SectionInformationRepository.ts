import { BaseRepository } from "../util/BaseRepository";
import { SectionInformation } from "../models/SectionInformation";

export class SectionInformationRepository extends BaseRepository<SectionInformation> {
  constructor() {
    super(SectionInformation);
  }
  
//   async findActive(): Promise<SectionInformation[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findByType(type: string): Promise<SectionInformation[]> {
//     return this.repository.find({
//       where: { type }
//     });
//   }
}