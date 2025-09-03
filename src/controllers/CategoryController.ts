import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import { DeepPartial } from 'typeorm';
import { Category } from '../models/Category';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  /**
   * Obtiene todas las categorías
   */
  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const categories = withRelations 
        ? await this.categoryService.getAllWithRelations()
        : await this.categoryService.getAllCategories();
      
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  };

  /**
   * Obtiene una categoría por su ID
   */
  getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const category = withRelations
        ? await this.categoryService.getCategoryWithRelations(id)
        : await this.categoryService.getCategoryById(id);

      if (!category) {
        res.status(404).json({ message: 'Categoría no encontrada' });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      res.status(500).json({ message: 'Error al obtener la categoría' });
    }
  };

  /**
   * Obtiene categorías por nombre
   */
  getCategoriesByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name || req.query.name as string;
      
      if (!name) {
        res.status(400).json({ message: 'El nombre es requerido' });
        return;
      }

      const categories = await this.categoryService.getCategoriesByName(name);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error al obtener las categorías por nombre:', error);
      res.status(500).json({ message: 'Error al obtener las categorías por nombre' });
    }
  };

  /**
   * Crea una nueva categoría
   */
  createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryData: DeepPartial<Category> = req.body;
      
      const newCategory = await this.categoryService.createCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      res.status(500).json({ message: 'Error al crear la categoría' });
    }
  };

  /**
   * Actualiza una categoría existente
   */
  updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const categoryData: DeepPartial<Category> = req.body;
      
      const exists = await this.categoryService.categoryExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Categoría no encontrada' });
        return;
      }

      const updatedCategory = await this.categoryService.updateCategory(id, categoryData);
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
  };

  /**
   * Elimina una categoría
   */
  deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.categoryService.categoryExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Categoría no encontrada' });
        return;
      }

      const deleted = await this.categoryService.deleteCategory(id);
      if (deleted) {
        res.status(200).json({ message: 'Categoría eliminada con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar la categoría' });
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
  };

  /**
   * Guarda múltiples categorías
   */
  saveManyCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoriesData: DeepPartial<Category>[] = req.body;
      
      if (!Array.isArray(categoriesData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de categorías' });
        return;
      }

      const savedCategories = await this.categoryService.saveManyCategories(categoriesData);
      res.status(201).json(savedCategories);
    } catch (error) {
      console.error('Error al guardar múltiples categorías:', error);
      res.status(500).json({ message: 'Error al guardar múltiples categorías' });
    }
  };

  /**
   * Obtiene la cantidad total de categorías
   */
  countCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.categoryService.countCategories();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de categorías:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de categorías' });
    }
  };
}