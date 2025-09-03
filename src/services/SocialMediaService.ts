import { SocialMedia } from "../models/SocialMedia";
import { SocialMediaRepository } from "../repositories/SocialMediaRepository";
import { DeepPartial } from "typeorm";

export class SocialMediaService {
  private socialMediaRepository: SocialMediaRepository;

  constructor() {
    this.socialMediaRepository = new SocialMediaRepository();
  }

  /**
   * Obtiene todas las redes sociales
   */
  async getAllSocialMedia(): Promise<SocialMedia[]> {
    return this.socialMediaRepository.findAll();
  }

  /**
   * Obtiene una red social por su ID
   */
  async getSocialMediaById(id: number): Promise<SocialMedia | null> {
    return this.socialMediaRepository.findById(id);
  }

  /**
   * Obtiene una red social por su nombre
   */
//   async getSocialMediaByName(name: string): Promise<SocialMedia | null> {
//     return this.socialMediaRepository.findByName(name);
//   }

  /**
   * Crea una nueva red social
   */
  async createSocialMedia(socialMediaData: DeepPartial<SocialMedia>): Promise<SocialMedia> {
    return this.socialMediaRepository.create(socialMediaData);
  }

  /**
   * Actualiza una red social existente
   */
//   async updateSocialMedia(id: number, socialMediaData: DeepPartial<SocialMedia>): Promise<SocialMedia> {
//     return this.socialMediaRepository.update(id, socialMediaData);
//   }

  /**
   * Elimina una red social
   */
  async deleteSocialMedia(id: number): Promise<void> {
    await this.socialMediaRepository.delete(id);
  }

  /**
   * Obtiene todas las redes sociales activas
   */
//   async getActiveSocialMedia(): Promise<SocialMedia[]> {
//     return this.socialMediaRepository.findActive();
//   }
}