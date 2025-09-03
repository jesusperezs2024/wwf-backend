import { BaseRepository } from "../util/BaseRepository";
import { Species } from "../models/Species";

export class SpeciesRepository extends BaseRepository<Species> {
  constructor() {
    super(Species);
  }
  
  async findByName(name: string): Promise<Species[]> {
    return this.repository.find({
      where: { name }
    });
  } 
  
}