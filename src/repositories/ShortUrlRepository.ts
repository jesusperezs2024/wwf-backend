import { BaseRepository } from "../util/BaseRepository";
import { ShortUrl } from "../models/ShortUrl";

export class ShortUrlRepository extends BaseRepository<ShortUrl> {
  constructor() {
    super(ShortUrl);
  }
  
  // Métodos específicos para ShortUrl
//   async findByCode(code: string): Promise<ShortUrl | null> {
//     return this.repository.findOne({
//       where: { code }
//     });
//   }
  
//   async findByOriginalUrl(originalUrl: string): Promise<ShortUrl | null> {
//     return this.repository.findOne({
//       where: { originalUrl }
//     });
//   }
  
  async incrementVisits(id: number): Promise<void> {
    await this.repository.increment({ id }, "visits", 1);
  }
}