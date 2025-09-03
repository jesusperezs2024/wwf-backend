import { LargeItems } from "../models/LargeItems";
import { LargeItemsRepository } from "../repositories/LargeItemsRepository";
import { DeepPartial } from "typeorm";

export class LargeItemsService {
  private largeItemsRepository: LargeItemsRepository;

  constructor() {
    this.largeItemsRepository = new LargeItemsRepository();
  }

  /**
   * Obtiene todos los items grandes
   */
  async getAllLargeItems(): Promise<LargeItems[]> {
    return this.largeItemsRepository.findAll();
  }

  /**
   * Obtiene todos los items grandes con sus relaciones
   */
  async getAllWithRelations(): Promise<LargeItems[]> {
    return this.largeItemsRepository.findWithRelations(['sectionLargeItems']);
  }

  /**
   * Obtiene un item grande por su ID
   */
  async getLargeItemById(id: number): Promise<LargeItems | null> {
    return this.largeItemsRepository.findById(id);
  }

  /**
   * Obtiene un item grande por su ID con relaciones
   */
  async getLargeItemWithRelations(id: number): Promise<LargeItems | null> {
    return this.largeItemsRepository.findByIdWithRelations(id, ['sectionLargeItems']);
  }

  /**
   * Crea un nuevo item grande
   */
  async createLargeItem(largeItemData: DeepPartial<LargeItems>): Promise<LargeItems> {
    return this.largeItemsRepository.create(largeItemData);
  }

  /**
   * Actualiza un item grande existente
   */
  async updateLargeItem(id: number, largeItemData: DeepPartial<LargeItems>): Promise<LargeItems | null> {
    return this.largeItemsRepository.update(id, largeItemData);
  }

  /**
   * Elimina un item grande
   */
  async deleteLargeItem(id: number): Promise<boolean> {
    return this.largeItemsRepository.delete(id);
  }

  /**
   * Verifica si existe un item grande
   */
  async largeItemExists(id: number): Promise<boolean> {
    return this.largeItemsRepository.exists(id);
  }

  /**
   * Guarda múltiples items grandes
   */
  async saveManyLargeItems(largeItems: DeepPartial<LargeItems>[]): Promise<LargeItems[]> {
    return this.largeItemsRepository.saveMany(largeItems);
  }

  /**
   * Obtiene la cantidad total de items grandes
   */
  async countLargeItems(): Promise<number> {
    return this.largeItemsRepository.count();
  }
}