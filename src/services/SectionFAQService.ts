import { SectionFAQ } from "../models/SectionFAQ";
import { SectionFAQRepository } from "../repositories/SectionFAQRepository";
import { DeepPartial } from "typeorm";

export class SectionFAQService {
  private sectionFAQRepository: SectionFAQRepository;

  constructor() {
    this.sectionFAQRepository = new SectionFAQRepository();
  }

  /**
   * Obtiene todas las secciones de preguntas frecuentes
   */
  async getAllSectionFAQs(): Promise<SectionFAQ[]> {
    return this.sectionFAQRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de preguntas frecuentes con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionFAQ[]> {
    return this.sectionFAQRepository.findWithRelations(['questions']);
  }

  /**
   * Obtiene una sección de preguntas frecuentes por su ID
   */
  async getSectionFAQById(id: number): Promise<SectionFAQ | null> {
    return this.sectionFAQRepository.findById(id);
  }

  /**
   * Obtiene una sección de preguntas frecuentes por su ID con relaciones
   */
  async getSectionFAQWithRelations(id: number): Promise<SectionFAQ | null> {
    return this.sectionFAQRepository.findByIdWithRelations(id, ['questions']);
  }

  /**
   * Crea una nueva sección de preguntas frecuentes
   */
  async createSectionFAQ(sectionFAQData: DeepPartial<SectionFAQ>): Promise<SectionFAQ> {
    return this.sectionFAQRepository.create(sectionFAQData);
  }

  /**
   * Actualiza una sección de preguntas frecuentes existente
   */
//   async updateSectionFAQ(id: number, sectionFAQData: DeepPartial<SectionFAQ>): Promise<SectionFAQ> {
//     return this.sectionFAQRepository.update(id, sectionFAQData);
//   }

  /**
   * Elimina una sección de preguntas frecuentes
   */
  async deleteSectionFAQ(id: number): Promise<void> {
    await this.sectionFAQRepository.delete(id);
  }
}