import { Testimony } from "../models/Testimony";
import { TestimonyRepository } from "../repositories/TestimonyRepository";
import { DeepPartial } from "typeorm";

export class TestimonyService {
  private testimonyRepository: TestimonyRepository;

  constructor() {
    this.testimonyRepository = new TestimonyRepository();
  }

  /**
   * Obtiene todos los testimonios
   */
  async getAllTestimonies(): Promise<Testimony[]> {
    return this.testimonyRepository.findAll();
  }

  /**
   * Obtiene un testimonio por su ID
   */
  async getTestimonyById(id: number): Promise<Testimony | null> {
    return this.testimonyRepository.findById(id);
  }

  /**
   * Obtiene testimonios por autor
   */
//   async getTestimoniesByAuthor(author: string): Promise<Testimony[]> {
//     return this.testimonyRepository.findByAuthor(author);
//   }

  /**
   * Obtiene testimonios activos
   */
//   async getActiveTestimonies(): Promise<Testimony[]> {
//     return this.testimonyRepository.findActive();
//   }

  /**
   * Crea un nuevo testimonio
   */
  async createTestimony(testimonyData: DeepPartial<Testimony>): Promise<Testimony> {
    return this.testimonyRepository.create(testimonyData);
  }

  /**
   * Actualiza un testimonio existente
   */
//   async updateTestimony(id: number, testimonyData: DeepPartial<Testimony>): Promise<Testimony> {
//     return this.testimonyRepository.update(id, testimonyData);
//   }

  /**
   * Elimina un testimonio
   */
  async deleteTestimony(id: number): Promise<void> {
    await this.testimonyRepository.delete(id);
  }

  /**
   * Cambia el estado de activación de un testimonio
   */
//   async toggleTestimonyActive(id: number): Promise<Testimony | null> {
//     return this.testimonyRepository.toggleActive(id);
//   }

  /**
   * Obtiene testimonios destacados
   */
//   async getFeaturedTestimonies(): Promise<Testimony[]> {
//     return this.testimonyRepository.findFeatured();
//   }
}