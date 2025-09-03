import { BaseRepository } from "../util/BaseRepository";
import { BannerContent } from "../models/BannerContent";

export class BannerContentRepository extends BaseRepository<BannerContent> {
  constructor() {
    super(BannerContent);
  }
  
  // Aquí puedes agregar métodos específicos para BannerContent
  // Por ejemplo:
  async findByBannerId(bannerId: number): Promise<BannerContent[]> {
    return this.repository.find({
      where: { bannerId }
    });
  }
  
  async findByHorizontalCardId(horizontalCardId: number): Promise<BannerContent[]> {
    return this.repository.find({
      where: { sectionHorizontalCardId: horizontalCardId }
    });
  }
}