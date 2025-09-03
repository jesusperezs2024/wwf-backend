import { Request, Response } from "express";
import { ProductsGeneralService } from "../services/ProductsGeneralService";
import { ProductsGeneral } from "../models/ProductsGeneral";

export class ProductsGeneralController {
  private productsGeneralService: ProductsGeneralService;

  constructor() {
    this.productsGeneralService = new ProductsGeneralService();
  }

  /**
   * Obtiene todos los productos generales
   */
  getAllProductsGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const productsGeneral = await this.productsGeneralService.getAllProductsGeneral();
      res.status(200).json(productsGeneral);
    } catch (error) {
      console.error("Error al obtener todos los productos generales:", error);
      res.status(500).json({ message: "Error al obtener los productos generales" });
    }
  };

  /**
   * Obtiene un producto general por su ID
   */
  getProductGeneralById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const productGeneral = await this.productsGeneralService.getProductGeneralById(id);
      
      if (!productGeneral) {
        res.status(404).json({ message: "Producto general no encontrado" });
        return;
      }
      
      res.status(200).json(productGeneral);
    } catch (error) {
      console.error(`Error al obtener el producto general con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener el producto general" });
    }
  };

  /**
   * Crea un nuevo producto general
   */
  createProductGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const productGeneralData = req.body;
      const newProductGeneral = await this.productsGeneralService.createProductGeneral(productGeneralData);
      res.status(201).json(newProductGeneral);
    } catch (error) {
      console.error("Error al crear el producto general:", error);
      res.status(500).json({ message: "Error al crear el producto general" });
    }
  };

  /**
   * Actualiza un producto general existente
   */
  updateProductGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const productGeneralData = req.body;
      const updatedProductGeneral = await this.productsGeneralService.updateProductGeneral(id, productGeneralData);
      
      if (!updatedProductGeneral) {
        res.status(404).json({ message: "Producto general no encontrado" });
        return;
      }
      
      res.status(200).json(updatedProductGeneral);
    } catch (error) {
      console.error(`Error al actualizar el producto general con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al actualizar el producto general" });
    }
  };

  /**
   * Elimina un producto general
   */
  deleteProductGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.productsGeneralService.deleteProductGeneral(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Producto general no encontrado" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar el producto general con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al eliminar el producto general" });
    }
  };

  /**
   * Verifica si existe un producto general
   */
  productGeneralExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const exists = await this.productsGeneralService.productGeneralExists(id);
      res.status(200).json({ exists });
    } catch (error) {
      console.error(`Error al verificar la existencia del producto general con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al verificar la existencia del producto general" });
    }
  };

  /**
   * Guarda múltiples productos generales
   */
  saveManyProductsGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const productsGeneralData = req.body;
      const savedProductsGeneral = await this.productsGeneralService.saveManyProductsGeneral(productsGeneralData);
      res.status(201).json(savedProductsGeneral);
    } catch (error) {
      console.error("Error al guardar múltiples productos generales:", error);
      res.status(500).json({ message: "Error al guardar múltiples productos generales" });
    }
  };

  /**
   * Obtiene la cuenta total de productos generales
   */
  countProductsGeneral = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.productsGeneralService.countProductsGeneral();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error al contar los productos generales:", error);
      res.status(500).json({ message: "Error al contar los productos generales" });
    }
  };
}