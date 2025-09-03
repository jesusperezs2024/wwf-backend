import { FAQ } from "../models/FAQ";
import { FAQRepository } from "../repositories/FAQRepository";
import { DeepPartial } from "typeorm";

export class FAQService {
  private faqRepository: FAQRepository;

  constructor() {
    this.faqRepository = new FAQRepository();
  }

  /**
   * Obtiene todas las preguntas frecuentes
   */
  async getAllFAQs(): Promise<FAQ[]> {
    return this.faqRepository.findAll();
  }

  /**
   * Obtiene todas las preguntas frecuentes con sus relaciones
   */
  async getAllWithRelations(): Promise<FAQ[]> {
    return this.faqRepository.findWithRelations(['sectionFAQ']);
  }

  /**
   * Obtiene una pregunta frecuente por su ID
   */
  async getFAQById(id: number): Promise<FAQ | null> {
    return this.faqRepository.findById(id);
  }

  /**
   * Obtiene preguntas frecuentes por categoría
   */
//   async getFAQsByCategory(category: string): Promise<FAQ[]> {
//     return this.faqRepository.findByCategory(category);
//   }

  /**
   * Crea una nueva pregunta frecuente
   */
  async createFAQ(faqData: DeepPartial<FAQ>): Promise<FAQ> {
    return this.faqRepository.create(faqData);
  }

  /**
   * Actualiza una pregunta frecuente existente
   */
  async updateFAQ(id: number, faqData: DeepPartial<FAQ>): Promise<FAQ | null> {
    return this.faqRepository.update(id, faqData);
  }

  /**
   * Elimina una pregunta frecuente
   */
  async deleteFAQ(id: number): Promise<boolean> {
    return this.faqRepository.delete(id);
  }

  /**
   * Verifica si existe una pregunta frecuente
   */
  async faqExists(id: number): Promise<boolean> {
    return this.faqRepository.exists(id);
  }

  /**
   * Guarda múltiples preguntas frecuentes
   */
  async saveManyFAQs(faqs: DeepPartial<FAQ>[]): Promise<FAQ[]> {
    return this.faqRepository.saveMany(faqs);
  }

  /**
   * Busca preguntas frecuentes por palabra clave
   */
  async searchFAQs(keyword: string): Promise<FAQ[]> {
    return this.faqRepository.search(keyword);
  }

  /**
   * Obtiene la cantidad total de preguntas frecuentes
   */
  async countFAQs(): Promise<number> {
    return this.faqRepository.count();
  }
}