import { Products } from "../models/Products";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { DeepPartial } from "typeorm";

export class ProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  /**
   * Obtiene todos los productos
   */
  async getAllProducts(): Promise<Products[]> {
    return this.productsRepository.findAll();
  }

  /**
   * Obtiene todos los productos con sus relaciones
   */
  async getAllWithRelations(): Promise<Products[]> {
    return this.productsRepository.findWithRelations(['category', 'productAmounts']);
  }

  /**
   * Obtiene un producto por su ID
   */
  async getProductById(id: number): Promise<Products | null> {
    return this.productsRepository.findById(id);
  }

  /**
   * Obtiene un producto por su ID con relaciones
   */
  async getProductWithRelations(id: number): Promise<Products | null> {
    return this.productsRepository.findByIdWithRelations(id, ['category', 'productAmounts']);
  }

  /**
   * Crea un nuevo producto
   */
  async createProduct(productData: DeepPartial<Products>): Promise<Products> {
    return this.productsRepository.create(productData);
  }

  /**
   * Actualiza un producto existente
   */
  async updateProduct(id: number, productData: DeepPartial<Products>): Promise<Products | null> {
    return this.productsRepository.update(id, productData);
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: number): Promise<boolean> {
    return this.productsRepository.delete(id);
  }

  /**
   * Verifica si existe un producto
   */
  async productExists(id: number): Promise<boolean> {
    return this.productsRepository.exists(id);
  }

  /**
   * Guarda múltiples productos
   */
  async saveManyProducts(products: DeepPartial<Products>[]): Promise<Products[]> {
    return this.productsRepository.saveMany(products);
  }

  /**
   * Obtiene productos por categoría
   */
//   async getProductsByCategory(categoryId: number): Promise<Products[]> {
//     return this.productsRepository.findByCategory(categoryId);
//   }

  /**
   * Busca productos por nombre o descripción
   */
//   async searchProducts(query: string): Promise<Products[]> {
//     return this.productsRepository.search(query);
//   }

  /**
   * Obtiene la cuenta total de productos
   */
  async countProducts(): Promise<number> {
    return this.productsRepository.count();
  }
}