import { BannerContent } from "../models/BannerContent";
import { BannerContentRepository } from "../repositories/BannerContentRepository";
import { DeepPartial } from "typeorm";

export class BannerContentService {
  private bannerContentRepository: BannerContentRepository;

  constructor() {
    this.bannerContentRepository = new BannerContentRepository();
  }

  /**
   * Obtiene todos los contenidos de banner
   */
  async getAllBannerContents(): Promise<BannerContent[]> {
    return this.bannerContentRepository.findAll();
  }

  /**
   * Obtiene todos los contenidos de banner con sus relaciones
   */
  async getAllWithRelations(): Promise<BannerContent[]> {
    return this.bannerContentRepository.findWithRelations(['sectionBanner', 'horizontalCard']);
  }

  /**
   * Obtiene un contenido de banner por su ID
   */
  async getBannerContentById(id: number): Promise<BannerContent | null> {
    return this.bannerContentRepository.findById(id);
  }

  /**
   * Obtiene un contenido de banner por su ID con relaciones
   */
  async getBannerContentWithRelations(id: number): Promise<BannerContent | null> {
    return this.bannerContentRepository.findByIdWithRelations(id, ['sectionBanner', 'horizontalCard']);
  }

  /**
   * Obtiene contenidos de banner por ID de banner
   */
  async getByBannerId(bannerId: number): Promise<BannerContent[]> {
    return this.bannerContentRepository.findByBannerId(bannerId);
  }

  /**
   * Obtiene contenidos de banner por ID de tarjeta horizontal
   */
  async getByHorizontalCardId(horizontalCardId: number): Promise<BannerContent[]> {
    return this.bannerContentRepository.findByHorizontalCardId(horizontalCardId);
  }

  /**
   * Crea un nuevo contenido de banner
   */
  async createBannerContent(bannerContentData: DeepPartial<BannerContent>): Promise<BannerContent> {
    return this.bannerContentRepository.create(bannerContentData);
  }

  /**
   * Actualiza un contenido de banner existente
   */
  async updateBannerContent(id: number, bannerContentData: DeepPartial<BannerContent>): Promise<BannerContent | null> {
    return this.bannerContentRepository.update(id, bannerContentData);
  }

  /**
   * Elimina un contenido de banner
   */
  async deleteBannerContent(id: number): Promise<boolean> {
    return this.bannerContentRepository.delete(id);
  }

  /**
   * Verifica si existe un contenido de banner
   */
  async bannerContentExists(id: number): Promise<boolean> {
    return this.bannerContentRepository.exists(id);
  }

  /**
   * Guarda múltiples contenidos de banner
   */
  async saveManyBannerContents(bannerContents: DeepPartial<BannerContent>[]): Promise<BannerContent[]> {
    return this.bannerContentRepository.saveMany(bannerContents);
  }

  /**
   * Obtiene la cuenta total de contenidos de banner
   */
  async countBannerContents(): Promise<number> {
    return this.bannerContentRepository.count();
  }
}