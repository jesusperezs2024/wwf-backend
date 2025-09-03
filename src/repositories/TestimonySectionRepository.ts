import { BaseRepository } from "../util/BaseRepository";
import { TestimonySection } from "../models/TestimonySection";

export class TestimonySectionRepository extends BaseRepository<TestimonySection> {
  constructor() {
    super(TestimonySection);
  }
  
  // Métodos específicos para TestimonySection
  async findByTestimonyId(testimonyId: number): Promise<TestimonySection[]> {
    return this.repository.find({
      where: { testimonyId }
    });
  }
  
//   async findBySectionId(sectionId: number): Promise<TestimonySection[]> {
//     return this.repository.find({
//       where: { sectionId }
//     });
//   }
}