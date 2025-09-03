import { TestimonySection } from "../models/TestimonySection";
import { TestimonySectionRepository } from "../repositories/TestimonySectionRepository";
import { DeepPartial } from "typeorm";

export class TestimonySectionService {
  private testimonySectionRepository: TestimonySectionRepository;

  constructor() {
    this.testimonySectionRepository = new TestimonySectionRepository();
  }

  /**
   * Obtiene todas las secciones de testimonios
   */
  async getAllTestimonySections(): Promise<TestimonySection[]> {
    return this.testimonySectionRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de testimonios con sus relaciones
   */
  async getAllWithRelations(): Promise<TestimonySection[]> {
    return this.testimonySectionRepository.findWithRelations(['testimonies']);
  }

  /**
   * Obtiene una sección de testimonios por su ID
   */
  async getTestimonySectionById(id: number): Promise<TestimonySection | null> {
    return this.testimonySectionRepository.findById(id);
  }

  /**
   * Obtiene una sección de testimonios por su ID con relaciones
   */
  async getTestimonySectionWithRelations(id: number): Promise<TestimonySection | null> {
    return this.testimonySectionRepository.findByIdWithRelations(id, ['testimonies']);
  }

  /**
   * Crea una nueva sección de testimonios
   */
  async createTestimonySection(testimonySectionData: DeepPartial<TestimonySection>): Promise<TestimonySection> {
    return this.testimonySectionRepository.create(testimonySectionData);
  }

  /**
   * Actualiza una sección de testimonios existente
   */
//   async updateTestimonySection(id: number, testimonySectionData: DeepPartial<TestimonySection>): Promise<TestimonySection> {
//     return this.testimonySectionRepository.update(id, testimonySectionData);
//   }

  /**
   * Elimina una sección de testimonios
   */
  async deleteTestimonySection(id: number): Promise<void> {
    await this.testimonySectionRepository.delete(id);
  }

  /**
   * Obtiene secciones de testimonios por título
   */
//   async getTestimonySectionByTitle(title: string): Promise<TestimonySection | null> {
//     return this.testimonySectionRepository.findByTitle(title);
//   }

  /**
   * Obtiene secciones de testimonios activas
   */
//   async getActiveTestimonySections(): Promise<TestimonySection[]> {
//     return this.testimonySectionRepository.findActive();
//   }
}