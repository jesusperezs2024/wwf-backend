import { SectionItems } from "../models/SectionItems";
import { SectionItemsRepository } from "../repositories/SectionItemsRepository";
import { DeepPartial } from "typeorm";

export class SectionItemsService {
  private sectionItemsRepository: SectionItemsRepository;

  constructor() {
    this.sectionItemsRepository = new SectionItemsRepository();
  }

  /**
   * Obtiene todas las secciones de items
   */
  async getAllSectionItems(): Promise<SectionItems[]> {
    return this.sectionItemsRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de items con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionItems[]> {
    return this.sectionItemsRepository.findWithRelations(['items']);
  }

  /**
   * Obtiene una sección de items por su ID
   */
  async getSectionItemsById(id: number): Promise<SectionItems | null> {
    return this.sectionItemsRepository.findById(id);
  }

  /**
   * Obtiene una sección de items por su ID con relaciones
   */
  async getSectionItemsWithRelations(id: number): Promise<SectionItems | null> {
    return this.sectionItemsRepository.findByIdWithRelations(id, ['items']);
  }

  /**
   * Crea una nueva sección de items
   */
  async createSectionItems(sectionItemsData: DeepPartial<SectionItems>): Promise<SectionItems> {
    return this.sectionItemsRepository.create(sectionItemsData);
  }

  /**
   * Actualiza una sección de items existente
   */
//   async updateSectionItems(id: number, sectionItemsData: DeepPartial<SectionItems>): Promise<SectionItems> {
//     return this.sectionItemsRepository.update(id, sectionItemsData);
//   }

  /**
   * Elimina una sección de items
   */
  async deleteSectionItems(id: number): Promise<void> {
    await this.sectionItemsRepository.delete(id);
  }
}