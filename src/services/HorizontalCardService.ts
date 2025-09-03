import { HorizontalCard } from "../models/HorizontalCard";
import { HorizontalCardRepository } from "../repositories/HorizontalCardRepository";
import { DeepPartial } from "typeorm";

export class HorizontalCardService {
  private horizontalCardRepository: HorizontalCardRepository;

  constructor() {
    this.horizontalCardRepository = new HorizontalCardRepository();
  }

  /**
   * Obtiene todas las tarjetas horizontales
   */
  async getAllHorizontalCards(): Promise<HorizontalCard[]> {
    return this.horizontalCardRepository.findAll();
  }

  /**
   * Obtiene todas las tarjetas horizontales con sus relaciones
   */
  async getAllWithRelations(): Promise<HorizontalCard[]> {
    return this.horizontalCardRepository.findWithRelations(['bannerContents', 'sectionHorizontalCard']);
  }

  /**
   * Obtiene una tarjeta horizontal por su ID
   */
  async getHorizontalCardById(id: number): Promise<HorizontalCard | null> {
    return this.horizontalCardRepository.findById(id);
  }

  /**
   * Obtiene una tarjeta horizontal por su ID con relaciones
   */
  async getHorizontalCardWithRelations(id: number): Promise<HorizontalCard | null> {
    return this.horizontalCardRepository.findByIdWithRelations(id, ['bannerContents', 'sectionHorizontalCard']);
  }

  /**
   * Crea una nueva tarjeta horizontal
   */
  async createHorizontalCard(horizontalCardData: DeepPartial<HorizontalCard>): Promise<HorizontalCard> {
    return this.horizontalCardRepository.create(horizontalCardData);
  }

  /**
   * Actualiza una tarjeta horizontal existente
   */
  async updateHorizontalCard(id: number, horizontalCardData: DeepPartial<HorizontalCard>): Promise<HorizontalCard | null> {
    return this.horizontalCardRepository.update(id, horizontalCardData);
  }

  /**
   * Elimina una tarjeta horizontal
   */
  async deleteHorizontalCard(id: number): Promise<boolean> {
    return this.horizontalCardRepository.delete(id);
  }

  /**
   * Verifica si existe una tarjeta horizontal
   */
  async horizontalCardExists(id: number): Promise<boolean> {
    return this.horizontalCardRepository.exists(id);
  }

  /**
   * Guarda múltiples tarjetas horizontales
   */
  async saveManyHorizontalCards(horizontalCards: DeepPartial<HorizontalCard>[]): Promise<HorizontalCard[]> {
    return this.horizontalCardRepository.saveMany(horizontalCards);
  }

  /**
   * Obtiene tarjetas horizontales por tipo
   */
//   async getHorizontalCardsByType(type: string): Promise<HorizontalCard[]> {
//     return this.horizontalCardRepository.findByType(type);
//   }

  /**
   * Obtiene la cantidad total de tarjetas horizontales
   */
  async countHorizontalCards(): Promise<number> {
    return this.horizontalCardRepository.count();
  }
}