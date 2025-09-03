import { BaseRepository } from "../util/BaseRepository";
import { Source } from "../models/Source";

export class SourceRepository extends BaseRepository<Source> {
  constructor() {
    super(Source);
  }
  
  // Métodos específicos para Source
  async findByType(type: string): Promise<Source[]> {
    return this.repository.find({
      where: { type }
    });
  }
  
  async findByName(name: string): Promise<Source | null> {
    return this.repository.findOne({
      where: { name }
    });
  }
}