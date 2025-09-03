import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { DeepPartial } from "typeorm";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  /**
   * Obtiene todas las categorías
   */
  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  /**
   * Obtiene todas las categorías con sus relaciones
   */
  async getAllWithRelations(): Promise<Category[]> {
    return this.categoryRepository.findWithRelations(['cards', 'products']);
  }

  /**
   * Obtiene una categoría por su ID
   */
  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  /**
   * Obtiene una categoría por su ID con relaciones
   */
  async getCategoryWithRelations(id: number): Promise<Category | null> {
    return this.categoryRepository.findByIdWithRelations(id, ['cards', 'products']);
  }

  /**
   * Crea una nueva categoría
   */
  async createCategory(categoryData: DeepPartial<Category>): Promise<Category> {
    return this.categoryRepository.create(categoryData);
  }

  /**
   * Actualiza una categoría existente
   */
  async updateCategory(id: number, categoryData: DeepPartial<Category>): Promise<Category | null> {
    return this.categoryRepository.update(id, categoryData);
  }

  /**
   * Elimina una categoría
   */
  async deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.delete(id);
  }

  /**
   * Verifica si existe una categoría
   */
  async categoryExists(id: number): Promise<boolean> {
    return this.categoryRepository.exists(id);
  }

  /**
   * Guarda múltiples categorías
   */
  async saveManyCategories(categories: DeepPartial<Category>[]): Promise<Category[]> {
    return this.categoryRepository.saveMany(categories);
  }

  /**
   * Obtiene categorías por nombre
   */
  async getCategoriesByName(name: string): Promise<Category[]> {
    return this.categoryRepository.findByName(name);
  }

  /**
   * Obtiene la cantidad total de categorías
   */
  async countCategories(): Promise<number> {
    return this.categoryRepository.count();
  }
}