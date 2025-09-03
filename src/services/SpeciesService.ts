import { Species } from "../models/Species";
import { SpeciesRepository } from "../repositories/SpeciesRepository";
import { DeepPartial } from "typeorm";

export class SpeciesService {
  private speciesRepository: SpeciesRepository;

  constructor() {
    this.speciesRepository = new SpeciesRepository();
  }

  /**
   * Obtiene todas las especies
   */
  async getAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.findAll();
  }

  /**
   * Obtiene todas las especies con sus relaciones
   */
  async getAllWithRelations(): Promise<Species[]> {
    return this.speciesRepository.findWithRelations(['cards', 'products']);
  }

  /**
   * Obtiene una especie por su ID
   */
  async getSpeciesById(id: number): Promise<Species | null> {
    return this.speciesRepository.findById(id);
  }

  /**
   * Obtiene una especie por su ID con relaciones
   */
  async getSpeciesWithRelations(id: number): Promise<Species | null> {
    return this.speciesRepository.findByIdWithRelations(id, ['products']);
  }

  /**
   * Crea una nueva especie
   */
  async createSpecies(speciesData: DeepPartial<Species>): Promise<Species> {
    return this.speciesRepository.create(speciesData);
  }

  /**
   * Actualiza una especie existente
   */
  async updateSpecies(id: number, speciesData: DeepPartial<Species>): Promise<Species | null> {
    return this.speciesRepository.update(id, speciesData);
  }

  /**
   * Elimina una especie
   */
  async deleteSpecies(id: number): Promise<boolean> {
    return this.speciesRepository.delete(id);
  }

  /**
   * Verifica si existe una especie
   */
  async speciesExists(id: number): Promise<boolean> {
    return this.speciesRepository.exists(id);
  }

  /**
   * Guarda múltiples especies
   */
  async saveManySpecies(species: DeepPartial<Species>[]): Promise<Species[]> {
    return this.speciesRepository.saveMany(species);
  }

  /**
   * Obtiene especies por nombre
   */
  async getSpeciesByName(name: string): Promise<Species[]> {
    return this.speciesRepository.findByName(name);
  }

  /**
   * Obtiene la cantidad total de especies
   */
  async countSpecies(): Promise<number> {
    return this.speciesRepository.count();
  }
}