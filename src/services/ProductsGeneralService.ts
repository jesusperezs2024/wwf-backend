import { ProductsGeneral } from "../models/ProductsGeneral";
import { ProductsGeneralRepository } from "../repositories/ProductsGeneralRepository";
import { DeepPartial } from "typeorm";

export class ProductsGeneralService {
  private productsGeneralRepository: ProductsGeneralRepository;

  constructor() {
    this.productsGeneralRepository = new ProductsGeneralRepository();
  }

  /**
   * Obtiene todos los productos generales
   */
  async getAllProductsGeneral(): Promise<ProductsGeneral[]> {
    return this.productsGeneralRepository.findAll();
  }

  /**
   * Obtiene un producto general por su ID
   */
  async getProductGeneralById(id: number): Promise<ProductsGeneral | null> {
    return this.productsGeneralRepository.findById(id);
  }

  /**
   * Crea un nuevo producto general
   */
  async createProductGeneral(productGeneralData: DeepPartial<ProductsGeneral>): Promise<ProductsGeneral> {
    return this.productsGeneralRepository.create(productGeneralData);
  }

  /**
   * Actualiza un producto general existente
   */
  async updateProductGeneral(id: number, productGeneralData: DeepPartial<ProductsGeneral>): Promise<ProductsGeneral | null> {
    return this.productsGeneralRepository.update(id, productGeneralData);
  }

  /**
   * Elimina un producto general
   */
  async deleteProductGeneral(id: number): Promise<boolean> {
    return this.productsGeneralRepository.delete(id);
  }

  /**
   * Verifica si existe un producto general
   */
  async productGeneralExists(id: number): Promise<boolean> {
    return this.productsGeneralRepository.exists(id);
  }

  /**
   * Guarda múltiples productos generales
   */
  async saveManyProductsGeneral(productsGeneral: DeepPartial<ProductsGeneral>[]): Promise<ProductsGeneral[]> {
    return this.productsGeneralRepository.saveMany(productsGeneral);
  }

  /**
   * Obtiene la cuenta total de productos generales
   */
  async countProductsGeneral(): Promise<number> {
    return this.productsGeneralRepository.count();
  }
}