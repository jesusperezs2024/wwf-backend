import { SectionLargeItems } from "../models/SectionLargeItems";
import { SectionLargeItemsRepository } from "../repositories/SectionLargeItemsRepository";
import { DeepPartial } from "typeorm";

export class SectionLargeItemsService {
  private sectionLargeItemsRepository: SectionLargeItemsRepository;

  constructor() {
    this.sectionLargeItemsRepository = new SectionLargeItemsRepository();
  }

  /**
   * Obtiene todas las secciones de items grandes
   */
  async getAllSectionLargeItems(): Promise<SectionLargeItems[]> {
    return this.sectionLargeItemsRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de items grandes con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionLargeItems[]> {
    return this.sectionLargeItemsRepository.findWithRelations(['largeItems']);
  }

  /**
   * Obtiene una sección de items grandes por su ID
   */
  async getSectionLargeItemsById(id: number): Promise<SectionLargeItems | null> {
    return this.sectionLargeItemsRepository.findById(id);
  }

  /**
   * Obtiene una sección de items grandes por su ID con relaciones
   */
  async getSectionLargeItemsWithRelations(id: number): Promise<SectionLargeItems | null> {
    return this.sectionLargeItemsRepository.findByIdWithRelations(id, ['largeItems']);
  }

  /**
   * Crea una nueva sección de items grandes
   */
  async createSectionLargeItems(sectionLargeItemsData: DeepPartial<SectionLargeItems>): Promise<SectionLargeItems> {
    return this.sectionLargeItemsRepository.create(sectionLargeItemsData);
  }

  /**
   * Actualiza una sección de items grandes existente
   */
//   async updateSectionLargeItems(id: number, sectionLargeItemsData: DeepPartial<SectionLargeItems>): Promise<SectionLargeItems> {
//     return this.sectionLargeItemsRepository.update(id, sectionLargeItemsData);
//   }

  /**
   * Elimina una sección de items grandes
   */
  async deleteSectionLargeItems(id: number): Promise<void> {
    await this.sectionLargeItemsRepository.delete(id);
  }
}