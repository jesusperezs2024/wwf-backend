import { BaseRepository } from "../util/BaseRepository";
import { Cards } from "../models/Cards";

export class BannerContentRepository extends BaseRepository<Cards> {
  constructor() {
    super(Cards);
  }
  
  // Aquí puedes agregar métodos específicos para Cards
  // Por ejemplo:
  async findByCardId(cardsId: number): Promise<Cards[]> {
    return this.repository.find({
      where: { cardsId }
    });
  }
   
}