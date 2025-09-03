import { ProductsAmounts } from "../models/ProductsAmounts";
import { ProductsAmountsRepository } from "../repositories/ProductsAmountsRepository";
import { DeepPartial } from "typeorm";

export class ProductsAmountsService {
  private productsAmountsRepository: ProductsAmountsRepository;

  constructor() {
    this.productsAmountsRepository = new ProductsAmountsRepository();
  }

  /**
   * Obtiene todos los montos de productos
   */
  async getAllProductsAmounts(): Promise<ProductsAmounts[]> {
    return this.productsAmountsRepository.findAll();
  }

  /**
   * Obtiene todos los montos de productos con sus relaciones
   */
  async getAllWithRelations(): Promise<ProductsAmounts[]> {
    return this.productsAmountsRepository.findWithRelations(['product']);
  }

  /**
   * Obtiene un monto de producto por su ID
   */
  async getProductAmountById(id: number): Promise<ProductsAmounts | null> {
    return this.productsAmountsRepository.findById(id);
  }

  /**
   * Obtiene montos de productos por ID de producto
   */
//   async getProductAmountsByProductId(productId: number): Promise<ProductsAmounts[]> {
//     return this.productsAmountsRepository.findByProductId(productId);
//   }

  /**
   * Crea un nuevo monto de producto
   */
  async createProductAmount(productAmountData: DeepPartial<ProductsAmounts>): Promise<ProductsAmounts> {
    return this.productsAmountsRepository.create(productAmountData);
  }

  /**
   * Actualiza un monto de producto existente
   */
  async updateProductAmount(id: number, productAmountData: DeepPartial<ProductsAmounts>): Promise<ProductsAmounts | null> {
    return this.productsAmountsRepository.update(id, productAmountData);
  }

  /**
   * Elimina un monto de producto
   */
  async deleteProductAmount(id: number): Promise<boolean> {
    return this.productsAmountsRepository.delete(id);
  }

  /**
   * Verifica si existe un monto de producto
   */
  async productAmountExists(id: number): Promise<boolean> {
    return this.productsAmountsRepository.exists(id);
  }

  /**
   * Guarda múltiples montos de productos
   */
  async saveManyProductAmounts(productAmounts: DeepPartial<ProductsAmounts>[]): Promise<ProductsAmounts[]> {
    return this.productsAmountsRepository.saveMany(productAmounts);
  }

  /**
   * Obtiene la cuenta total de montos de productos
   */
  async countProductAmounts(): Promise<number> {
    return this.productsAmountsRepository.count();
  }
}