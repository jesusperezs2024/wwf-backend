import { BaseRepository } from "../util/BaseRepository";
import { FAQ } from "../models/FAQ";
import { Like } from "typeorm";

export class FAQRepository extends BaseRepository<FAQ> {
  constructor() {
    super(FAQ);
  }
  
  async findBySection (sectionFAQId: number): Promise<FAQ[]> {
    return this.repository.find({
      where: { sectionFAQId }
    });
  }
  
  async search(keyword: string): Promise<FAQ[]> {
    return this.repository.find({
      where: [
        { question: Like(`%${keyword}%`) },
        { answer: Like(`%${keyword}%`) }
      ]
    });
  }
  
  async findBySectionFAQId(sectionFAQId: number): Promise<FAQ[]> {
    return this.repository.find({
      where: { sectionFAQId }
    });
  }
}