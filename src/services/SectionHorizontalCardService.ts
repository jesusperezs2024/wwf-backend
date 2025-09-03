import { SectionHorizontalCard } from "../models/SectionHorizontalCard";
import { SectionHorizontalCardRepository } from "../repositories/SectionHorizontalCardRepository";
import { DeepPartial } from "typeorm";

export class SectionHorizontalCardService {
  private sectionHorizontalCardRepository: SectionHorizontalCardRepository;

  constructor() {
    this.sectionHorizontalCardRepository = new SectionHorizontalCardRepository();
  }

  /**
   * Obtiene todas las secciones de tarjetas horizontales
   */
  async getAllSectionHorizontalCards(): Promise<SectionHorizontalCard[]> {
    return this.sectionHorizontalCardRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de tarjetas horizontales con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionHorizontalCard[]> {
    return this.sectionHorizontalCardRepository.findWithRelations(['cards']);
  }

  /**
   * Obtiene una sección de tarjetas horizontales por su ID
   */
  async getSectionHorizontalCardById(id: number): Promise<SectionHorizontalCard | null> {
    return this.sectionHorizontalCardRepository.findById(id);
  }

  /**
   * Obtiene una sección de tarjetas horizontales por su ID con relaciones
   */
  async getSectionHorizontalCardWithRelations(id: number): Promise<SectionHorizontalCard | null> {
    return this.sectionHorizontalCardRepository.findByIdWithRelations(id, ['cards']);
  }

  /**
   * Crea una nueva sección de tarjetas horizontales
   */
  async createSectionHorizontalCard(sectionHorizontalCardData: DeepPartial<SectionHorizontalCard>): Promise<SectionHorizontalCard> {
    return this.sectionHorizontalCardRepository.create(sectionHorizontalCardData);
  }

  /**
   * Actualiza una sección de tarjetas horizontales existente
   */
//   async updateSectionHorizontalCard(id: number, sectionHorizontalCardData: DeepPartial<SectionHorizontalCard>): Promise<SectionHorizontalCard> {
//     return this.sectionHorizontalCardRepository.update(id, sectionHorizontalCardData);
//   }

  /**
   * Elimina una sección de tarjetas horizontales
   */
  async deleteSectionHorizontalCard(id: number): Promise<void> {
    await this.sectionHorizontalCardRepository.delete(id);
  }
}