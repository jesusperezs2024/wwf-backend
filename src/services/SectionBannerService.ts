import { SectionBanner } from "../models/SectionBanner";
import { SectionBannerRepository } from "../repositories/SectionBannerRepository";
import { DeepPartial } from "typeorm";

export class SectionBannerService {
  private sectionBannerRepository: SectionBannerRepository;

  constructor() {
    this.sectionBannerRepository = new SectionBannerRepository();
  }

  /**
   * Obtiene todas las secciones de banner
   */
  async getAllSectionBanners(): Promise<SectionBanner[]> {
    return this.sectionBannerRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de banner con sus relaciones
   */
  async getAllWithRelations(): Promise<SectionBanner[]> {
    return this.sectionBannerRepository.findWithRelations(['bannerContents']);
  }

  /**
   * Obtiene una sección de banner por su ID
   */
  async getSectionBannerById(id: number): Promise<SectionBanner | null> {
    return this.sectionBannerRepository.findById(id);
  }

  /**
   * Obtiene una sección de banner por su ID con relaciones
   */
  async getSectionBannerWithRelations(id: number): Promise<SectionBanner | null> {
    return this.sectionBannerRepository.findByIdWithRelations(id, ['bannerContents']);
  }

  /**
   * Crea una nueva sección de banner
   */
  async createSectionBanner(sectionBannerData: DeepPartial<SectionBanner>): Promise<SectionBanner> {
    return this.sectionBannerRepository.create(sectionBannerData);
  }

  /**
   * Actualiza una sección de banner existente
   */
  async updateSectionBanner(id: number, sectionBannerData: DeepPartial<SectionBanner>): Promise<SectionBanner | null> {
    return this.sectionBannerRepository.update(id, sectionBannerData);
  }

  /**
   * Elimina una sección de banner
   */
  async deleteSectionBanner(id: number): Promise<boolean> {
    return this.sectionBannerRepository.delete(id);
  }

  /**
   * Verifica si existe una sección de banner
   */
  async sectionBannerExists(id: number): Promise<boolean> {
    return this.sectionBannerRepository.exists(id);
  }

  /**
   * Guarda múltiples secciones de banner
   */
  async saveManySectionBanners(sectionBanners: DeepPartial<SectionBanner>[]): Promise<SectionBanner[]> {
    return this.sectionBannerRepository.saveMany(sectionBanners);
  }

  /**
   * Obtiene la cuenta total de secciones de banner
   */
  async countSectionBanners(): Promise<number> {
    return this.sectionBannerRepository.count();
  }
}