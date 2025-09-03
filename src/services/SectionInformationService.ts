import { SectionInformation } from "../models/SectionInformation";
import { SectionInformationRepository } from "../repositories/SectionInformationRepository";
import { DeepPartial } from "typeorm";

export class SectionInformationService {
  private sectionInformationRepository: SectionInformationRepository;

  constructor() {
    this.sectionInformationRepository = new SectionInformationRepository();
  }

  /**
   * Obtiene todas las secciones de información
   */
  async getAllSectionInformation(): Promise<SectionInformation[]> {
    return this.sectionInformationRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de información con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionInformation[]> {
    return this.sectionInformationRepository.findWithRelations(['content']);
  }

  /**
   * Obtiene una sección de información por su ID
   */
  async getSectionInformationById(id: number): Promise<SectionInformation | null> {
    return this.sectionInformationRepository.findById(id);
  }

  /**
   * Obtiene una sección de información por su ID con relaciones
   */
  async getSectionInformationWithRelations(id: number): Promise<SectionInformation | null> {
    return this.sectionInformationRepository.findByIdWithRelations(id, ['content']);
  }

  /**
   * Crea una nueva sección de información
   */
  async createSectionInformation(sectionInformationData: DeepPartial<SectionInformation>): Promise<SectionInformation> {
    return this.sectionInformationRepository.create(sectionInformationData);
  }

  /**
   * Actualiza una sección de información existente
   */
//   async updateSectionInformation(id: number, sectionInformationData: DeepPartial<SectionInformation>): Promise<SectionInformation> {
//     return this.sectionInformationRepository.update(id, sectionInformationData);
//   }

  /**
   * Elimina una sección de información
   */
  async deleteSectionInformation(id: number): Promise<void> {
    await this.sectionInformationRepository.delete(id);
  }
}