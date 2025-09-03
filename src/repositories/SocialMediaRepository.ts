import { BaseRepository } from "../util/BaseRepository";
import { SocialMedia } from "../models/SocialMedia";

export class SocialMediaRepository extends BaseRepository<SocialMedia> {
  constructor() {
    super(SocialMedia);
  }
  
  // Métodos específicos para SocialMedia
//   async findByPlatform(platform: string): Promise<SocialMedia[]> {
//     return this.repository.find({
//       where: { platform }
//     });
//   }
  
//   async findActive(): Promise<SocialMedia[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
}