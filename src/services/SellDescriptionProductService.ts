import { SellDescriptionProduct } from "../models/SellDescriptionProduct";
import { SellDescriptionProductRepository } from "../repositories/SellDescriptionProductRepository";
import { DeepPartial } from "typeorm";

export class SellDescriptionProductService {
  private sellDescriptionProductRepository: SellDescriptionProductRepository;

  constructor() {
    this.sellDescriptionProductRepository = new SellDescriptionProductRepository();
  }

  /**
   * Obtiene todas las descripciones de productos
   */
  async getAllSellDescriptionProducts(): Promise<SellDescriptionProduct[]> {
    return this.sellDescriptionProductRepository.findAll();
  }

  /**
   * Obtiene todas las descripciones de productos con sus relaciones
   */
  async getAllWithRelations(): Promise<SellDescriptionProduct[]> {
    return this.sellDescriptionProductRepository.findWithRelations(['product', 'features']);
  }

  /**
   * Obtiene una descripción de producto por su ID
   */
  async getSellDescriptionProductById(id: number): Promise<SellDescriptionProduct | null> {
    return this.sellDescriptionProductRepository.findById(id);
  }

  /**
   * Obtiene una descripción de producto por su ID con relaciones
   */
  async getSellDescriptionProductWithRelations(id: number): Promise<SellDescriptionProduct | null> {
    return this.sellDescriptionProductRepository.findByIdWithRelations(id, ['product', 'features']);
  }

  /**
   * Crea una nueva descripción de producto
   */
  async createSellDescriptionProduct(sellDescriptionProductData: DeepPartial<SellDescriptionProduct>): Promise<SellDescriptionProduct> {
    return this.sellDescriptionProductRepository.create(sellDescriptionProductData);
  }

  /**
   * Actualiza una descripción de producto existente
   */
//   async updateSellDescriptionProduct(id: number, sellDescriptionProductData: DeepPartial<SellDescriptionProduct>): Promise<SellDescriptionProduct> {
//     return this.sellDescriptionProductRepository.update(id, sellDescriptionProductData);
//   }

  /**
   * Elimina una descripción de producto
   */
  async deleteSellDescriptionProduct(id: number): Promise<void> {
    await this.sellDescriptionProductRepository.delete(id);
  }
}