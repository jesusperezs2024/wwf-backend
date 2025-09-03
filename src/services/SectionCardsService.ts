import { SectionCards } from "../models/SectionCards";
import { SectionCardsRepository } from "../repositories/SectionCardsRepository";
import { DeepPartial } from "typeorm";

export class SectionCardsService {
  private sectionCardsRepository: SectionCardsRepository;

  constructor() {
    this.sectionCardsRepository = new SectionCardsRepository();
  }

  /**
   * Obtiene todas las secciones de tarjetas
   */
  async getAllSectionCards(): Promise<SectionCards[]> {
    return this.sectionCardsRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de tarjetas con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionCards[]> {
    return this.sectionCardsRepository.findWithRelations(['cards']);
  }

  /**
   * Obtiene una sección de tarjetas por su ID
   */
  async getSectionCardsById(id: number): Promise<SectionCards | null> {
    return this.sectionCardsRepository.findById(id);
  }

  /**
   * Obtiene una sección de tarjetas por su ID con relaciones
   */
  async getSectionCardsWithRelations(id: number): Promise<SectionCards | null> {
    return this.sectionCardsRepository.findByIdWithRelations(id, ['cards']);
  }

  /**
   * Crea una nueva sección de tarjetas
   */
  async createSectionCards(sectionCardsData: DeepPartial<SectionCards>): Promise<SectionCards> {
    return this.sectionCardsRepository.create(sectionCardsData);
  }

  /**
   * Actualiza una sección de tarjetas existente
   */
  async updateSectionCards(id: number, sectionCardsData: DeepPartial<SectionCards>): Promise<SectionCards | null> {
    // Primero verificamos que la sección existe
    const existingSectionCards = await this.sectionCardsRepository.findById(id);
    
    if (!existingSectionCards) {
      return null;
    }
    
    // Actualizamos la sección
    return this.sectionCardsRepository.update(id, sectionCardsData);
  }

  /**
   * Elimina una sección de tarjetas por su ID
   */
  async deleteSectionCards(id: number): Promise<boolean> {
    // Primero verificamos que la sección existe
    const existingSectionCards = await this.sectionCardsRepository.findById(id);
    
    if (!existingSectionCards) {
      return false;
    }
    
    // Eliminamos la sección
    await this.sectionCardsRepository.delete(id);
    return true;
  }
}