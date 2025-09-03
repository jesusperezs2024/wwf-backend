import { Items } from "../models/Items";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { DeepPartial } from "typeorm";

export class ItemsService {
  private itemsRepository: ItemsRepository;

  constructor() {
    this.itemsRepository = new ItemsRepository();
  }

  /**
   * Obtiene todos los items
   */
  async getAllItems(): Promise<Items[]> {
    return this.itemsRepository.findAll();
  }

  /**
   * Obtiene todos los items con sus relaciones
   */
  async getAllWithRelations(): Promise<Items[]> {
    return this.itemsRepository.findWithRelations(['sectionItems']);
  }

  /**
   * Obtiene un item por su ID
   */
  async getItemById(id: number): Promise<Items | null> {
    return this.itemsRepository.findById(id);
  }

  /**
   * Obtiene un item por su ID con relaciones
   */
  async getItemWithRelations(id: number): Promise<Items | null> {
    return this.itemsRepository.findByIdWithRelations(id, ['sectionItems']);
  }

  /**
   * Crea un nuevo item
   */
  async createItem(itemData: DeepPartial<Items>): Promise<Items> {
    return this.itemsRepository.create(itemData);
  }

  /**
   * Actualiza un item existente
   */
  async updateItem(id: number, itemData: DeepPartial<Items>): Promise<Items | null> {
    return this.itemsRepository.update(id, itemData);
  }

  /**
   * Elimina un item
   */
  async deleteItem(id: number): Promise<boolean> {
    return this.itemsRepository.delete(id);
  }

  /**
   * Verifica si existe un item
   */
  async itemExists(id: number): Promise<boolean> {
    return this.itemsRepository.exists(id);
  }

  /**
   * Guarda múltiples items
   */
  async saveManyItems(items: DeepPartial<Items>[]): Promise<Items[]> {
    return this.itemsRepository.saveMany(items);
  }

  /**
   * Obtiene items por tipo
   */
//   async getItemsByType(type: string): Promise<Items[]> {
//     return this.itemsRepository.findByType(type);
//   }

  /**
   * Obtiene la cantidad total de items
   */
  async countItems(): Promise<number> {
    return this.itemsRepository.count();
  }
}