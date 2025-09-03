import { Request, Response } from "express";
import { ProductsAmountsService } from "../services/ProductsAmountsService";
import { ProductsAmounts } from "../models/ProductsAmounts";

export class ProductsAmountsController {
  private productsAmountsService: ProductsAmountsService;

  constructor() {
    this.productsAmountsService = new ProductsAmountsService();
  }

  /**
   * Obtiene todos los montos de productos
   */
  getAllProductsAmounts = async (req: Request, res: Response): Promise<void> => {
    try {
      const productsAmounts = await this.productsAmountsService.getAllProductsAmounts();
      res.status(200).json(productsAmounts);
    } catch (error) {
      console.error("Error al obtener todos los montos de productos:", error);
      res.status(500).json({ message: "Error al obtener los montos de productos" });
    }
  };

  /**
   * Obtiene todos los montos de productos con sus relaciones
   */
  getAllWithRelations = async (req: Request, res: Response): Promise<void> => {
    try {
      const productsAmounts = await this.productsAmountsService.getAllWithRelations();
      res.status(200).json(productsAmounts);
    } catch (error) {
      console.error("Error al obtener los montos de productos con relaciones:", error);
      res.status(500).json({ message: "Error al obtener los montos de productos con relaciones" });
    }
  };

  /**
   * Obtiene un monto de producto por su ID
   */
  getProductAmountById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const productAmount = await this.productsAmountsService.getProductAmountById(id);
      
      if (!productAmount) {
        res.status(404).json({ message: "Monto de producto no encontrado" });
        return;
      }
      
      res.status(200).json(productAmount);
    } catch (error) {
      console.error(`Error al obtener el monto de producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener el monto de producto" });
    }
  };

  /**
   * Obtiene montos de productos por ID de producto
   */
  // getProductAmountsByProductId = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const productId = parseInt(req.params.productId);
  //     const productsAmounts = await this.productsAmountsService.getProductAmountsByProductId(productId);
  //     res.status(200).json(productsAmounts);
  //   } catch (error) {
  //     console.error(`Error al obtener montos de productos para el producto ID ${req.params.productId}:`, error);
  //     res.status(500).json({ message: "Error al obtener montos de productos por ID de producto" });
  //   }
  // };

  /**
   * Crea un nuevo monto de producto
   */
  createProductAmount = async (req: Request, res: Response): Promise<void> => {
    try {
      const productAmountData = req.body;
      const newProductAmount = await this.productsAmountsService.createProductAmount(productAmountData);
      res.status(201).json(newProductAmount);
    } catch (error) {
      console.error("Error al crear el monto de producto:", error);
      res.status(500).json({ message: "Error al crear el monto de producto" });
    }
  };

  /**
   * Actualiza un monto de producto existente
   */
  updateProductAmount = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const productAmountData = req.body;
      const updatedProductAmount = await this.productsAmountsService.updateProductAmount(id, productAmountData);
      
      if (!updatedProductAmount) {
        res.status(404).json({ message: "Monto de producto no encontrado" });
        return;
      }
      
      res.status(200).json(updatedProductAmount);
    } catch (error) {
      console.error(`Error al actualizar el monto de producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al actualizar el monto de producto" });
    }
  };

  /**
   * Elimina un monto de producto
   */
  deleteProductAmount = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.productsAmountsService.deleteProductAmount(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Monto de producto no encontrado" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar el monto de producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al eliminar el monto de producto" });
    }
  };

  /**
   * Verifica si existe un monto de producto
   */
  productAmountExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const exists = await this.productsAmountsService.productAmountExists(id);
      res.status(200).json({ exists });
    } catch (error) {
      console.error(`Error al verificar la existencia del monto de producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al verificar la existencia del monto de producto" });
    }
  };

  /**
   * Guarda múltiples montos de productos
   */
  saveManyProductAmounts = async (req: Request, res: Response): Promise<void> => {
    try {
      const productAmountsData = req.body;
      const savedProductAmounts = await this.productsAmountsService.saveManyProductAmounts(productAmountsData);
      res.status(201).json(savedProductAmounts);
    } catch (error) {
      console.error("Error al guardar múltiples montos de productos:", error);
      res.status(500).json({ message: "Error al guardar múltiples montos de productos" });
    }
  };

  /**
   * Obtiene la cuenta total de montos de productos
   */
  countProductAmounts = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.productsAmountsService.countProductAmounts();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error al contar los montos de productos:", error);
      res.status(500).json({ message: "Error al contar los montos de productos" });
    }
  };
}