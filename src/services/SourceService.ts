import { Source } from "../models/Source";
import { SourceRepository } from "../repositories/SourceRepository";
import { DeepPartial } from "typeorm";

export class SourceService {
  private sourceRepository: SourceRepository;

  constructor() {
    this.sourceRepository = new SourceRepository();
  }

  /**
   * Obtiene todas las fuentes
   */
  async getAllSources(): Promise<Source[]> {
    return this.sourceRepository.findAll();
  }

  /**
   * Obtiene una fuente por su ID
   */
  async getSourceById(id: number): Promise<Source | null> {
    return this.sourceRepository.findById(id);
  }

  /**
   * Obtiene una fuente por su nombre
   */
  async getSourceByName(name: string): Promise<Source | null> {
    return this.sourceRepository.findByName(name);
  }

  /**
   * Obtiene todas las fuentes con sus relaciones
   */
  async getAllWithRelations(): Promise<Source[]> {
    return this.sourceRepository.findWithRelations(['references']);
  }

  /**
   * Crea una nueva fuente
   */
  async createSource(sourceData: DeepPartial<Source>): Promise<Source> {
    return this.sourceRepository.create(sourceData);
  }

  /**
   * Actualiza una fuente existente
   */
//   async updateSource(id: number, sourceData: DeepPartial<Source>): Promise<Source> {
//     return this.sourceRepository.update(id, sourceData);
//   }

  /**
   * Elimina una fuente
   */
  async deleteSource(id: number): Promise<void> {
    await this.sourceRepository.delete(id);
  }
}