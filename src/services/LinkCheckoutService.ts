import { LinkCheckout } from "../models/LinkCheckout";
import { LinkCheckoutRepository } from "../repositories/LinkCheckoutRepository";
import { DeepPartial } from "typeorm";

export class LinkCheckoutService {
  private linkCheckoutRepository: LinkCheckoutRepository;

  constructor() {
    this.linkCheckoutRepository = new LinkCheckoutRepository();
  }

  /**
   * Obtiene todos los enlaces de checkout
   */
  async getAllLinkCheckouts(): Promise<LinkCheckout[]> {
    return this.linkCheckoutRepository.findAll();
  }

  /**
   * Obtiene todos los enlaces de checkout con sus relaciones
   */
  async getAllWithRelations(): Promise<LinkCheckout[]> {
    return this.linkCheckoutRepository.findWithRelations(['checkout']);
  }

  /**
   * Obtiene un enlace de checkout por su ID
   */
  async getLinkCheckoutById(id: number): Promise<LinkCheckout | null> {
    return this.linkCheckoutRepository.findById(id);
  }

  /**
   * Obtiene un enlace de checkout por su código
   */
//   async getLinkCheckoutByCode(code: string): Promise<LinkCheckout | null> {
//     return this.linkCheckoutRepository.findByCode(code);
//   }

  /**
   * Crea un nuevo enlace de checkout
   */
  async createLinkCheckout(linkCheckoutData: DeepPartial<LinkCheckout>): Promise<LinkCheckout> {
    return this.linkCheckoutRepository.create(linkCheckoutData);
  }

  /**
   * Actualiza un enlace de checkout existente
   */
  async updateLinkCheckout(id: number, linkCheckoutData: DeepPartial<LinkCheckout>): Promise<LinkCheckout | null> {
    return this.linkCheckoutRepository.update(id, linkCheckoutData);
  }

  /**
   * Elimina un enlace de checkout
   */
  async deleteLinkCheckout(id: number): Promise<boolean> {
    return this.linkCheckoutRepository.delete(id);
  }

  /**
   * Verifica si existe un enlace de checkout
   */
  async linkCheckoutExists(id: number): Promise<boolean> {
    return this.linkCheckoutRepository.exists(id);
  }

  /**
   * Guarda múltiples enlaces de checkout
   */
  async saveManyLinkCheckouts(linkCheckouts: DeepPartial<LinkCheckout>[]): Promise<LinkCheckout[]> {
    return this.linkCheckoutRepository.saveMany(linkCheckouts);
  }

  /**
   * Genera un código único para el enlace de checkout
   */
//   async generateUniqueCode(): Promise<string> {
//     // Implementación para generar un código único
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';
    
//     do {
//       code = '';
//       for (let i = 0; i < 8; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//       }
//     } while (await this.getLinkCheckoutByCode(code) !== null);
    
//     return code;
//   }

  /**
   * Obtiene la cantidad total de enlaces de checkout
   */
  async countLinkCheckouts(): Promise<number> {
    return this.linkCheckoutRepository.count();
  }
}