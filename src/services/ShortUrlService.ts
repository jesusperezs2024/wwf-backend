import { ShortUrl } from "../models/ShortUrl";
import { ShortUrlRepository } from "../repositories/ShortUrlRepository";
import { DeepPartial } from "typeorm";

export class ShortUrlService {
  private shortUrlRepository: ShortUrlRepository;

  constructor() {
    this.shortUrlRepository = new ShortUrlRepository();
  }

  /**
   * Obtiene todas las URLs cortas
   */
  async getAllShortUrls(): Promise<ShortUrl[]> {
    return this.shortUrlRepository.findAll();
  }

  /**
   * Obtiene una URL corta por su ID
   */
  async getShortUrlById(id: number): Promise<ShortUrl | null> {
    return this.shortUrlRepository.findById(id);
  }

  /**
   * Obtiene una URL corta por su código
   */
//   async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
//     return this.shortUrlRepository.findByCode(code);
//   }

  /**
   * Obtiene una URL corta por su URL original
   */
//   async getShortUrlByOriginalUrl(originalUrl: string): Promise<ShortUrl | null> {
//     return this.shortUrlRepository.findByOriginalUrl(originalUrl);
//   }

  /**
   * Crea una nueva URL corta
   */
  async createShortUrl(shortUrlData: DeepPartial<ShortUrl>): Promise<ShortUrl> {
    return this.shortUrlRepository.create(shortUrlData);
  }

  /**
   * Actualiza una URL corta existente
   */
//   async updateShortUrl(id: number, shortUrlData: DeepPartial<ShortUrl>): Promise<ShortUrl> {
//     return this.shortUrlRepository.update(id, shortUrlData);
//   }

  /**
   * Elimina una URL corta
   */
  async deleteShortUrl(id: number): Promise<void> {
    await this.shortUrlRepository.delete(id);
  }

  /**
   * Incrementa el contador de clics para una URL corta
   */
//   async incrementClickCount(code: string): Promise<ShortUrl | null> {
//     return this.shortUrlRepository.incrementClickCount(code);
//   }
}