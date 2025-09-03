import { BaseRepository } from "../util/BaseRepository";
import { Testimony } from "../models/Testimony";

export class TestimonyRepository extends BaseRepository<Testimony> {
  constructor() {
    super(Testimony);
  }
  
  // Métodos específicos para Testimony
//   async findByRating(rating: number): Promise<Testimony[]> {
//     return this.repository.find({
//       where: { rating }
//     });
//   }
  
//   async findActive(): Promise<Testimony[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
  
//   async findFeatured(): Promise<Testimony[]> {
//     return this.repository.find({
//       where: { featured: true }
//     });
//   }
}