import { Content } from "../models/Content";
import { ContentRepository } from "../repositories/ContentRepository";
import { DeepPartial } from "typeorm";

export class ContentService {
  private contentRepository: ContentRepository;

  constructor() {
    this.contentRepository = new ContentRepository();
  }

  /**
   * Obtiene todos los contenidos
   */
  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.findAll();
  }

  /**
   * Obtiene todos los contenidos con sus relaciones
   */
  async getAllWithRelations(): Promise<Content[]> {
    return this.contentRepository.findWithRelations(['section']);
  }

  /**
   * Obtiene un contenido por su ID
   */
  async getContentById(id: number): Promise<Content | null> {
    return this.contentRepository.findById(id);
  }

  /**
   * Obtiene un contenido por su ID con relaciones
   */
  async getContentWithRelations(id: number): Promise<Content | null> {
    return this.contentRepository.findByIdWithRelations(id, ['section']);
  }

  /**
   * Crea un nuevo contenido
   */
  async createContent(contentData: DeepPartial<Content>): Promise<Content> {
    return this.contentRepository.create(contentData);
  }

  /**
   * Actualiza un contenido existente
   */
  async updateContent(id: number, contentData: DeepPartial<Content>): Promise<Content | null> {
    return this.contentRepository.update(id, contentData);
  }

  /**
   * Elimina un contenido
   */
  async deleteContent(id: number): Promise<boolean> {
    return this.contentRepository.delete(id);
  }

  /**
   * Verifica si existe un contenido
   */
  async contentExists(id: number): Promise<boolean> {
    return this.contentRepository.exists(id);
  }

  /**
   * Guarda múltiples contenidos
   */
  async saveManyContents(contents: DeepPartial<Content>[]): Promise<Content[]> {
    return this.contentRepository.saveMany(contents);
  }

  /**
   * Obtiene contenidos por tipo
   */
//   async getContentsByType(type: string): Promise<Content[]> {
//     return this.contentRepository.findByType(type);
//   }

  /**
   * Obtiene la cantidad total de contenidos
   */
  async countContents(): Promise<number> {
    return this.contentRepository.count();
  }
}