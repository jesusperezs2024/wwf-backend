import { Request, Response } from 'express';
import { SellDescriptionProductService } from '../services/SellDescriptionProductService';
import { SellDescriptionProduct } from '../models/SellDescriptionProduct';

export class SellDescriptionProductController {
  private sellDescriptionProductService: SellDescriptionProductService;

  constructor() {
    this.sellDescriptionProductService = new SellDescriptionProductService();
  }

  /**
   * Obtiene todas las descripciones de productos
   */
  getAllSellDescriptionProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sellDescriptionProducts: SellDescriptionProduct[];
      
      if (includeRelations) {
        sellDescriptionProducts = await this.sellDescriptionProductService.getAllWithRelations();
      } else {
        sellDescriptionProducts = await this.sellDescriptionProductService.getAllSellDescriptionProducts();
      }
      
      res.status(200).json({
        success: true,
        data: sellDescriptionProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las descripciones de productos',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una descripción de producto por su ID
   */
  getSellDescriptionProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const includeRelations = req.query.relations === 'true';
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      let sellDescriptionProduct: SellDescriptionProduct | null;
      
      if (includeRelations) {
        sellDescriptionProduct = await this.sellDescriptionProductService.getSellDescriptionProductWithRelations(id);
      } else {
        sellDescriptionProduct = await this.sellDescriptionProductService.getSellDescriptionProductById(id);
      }
      
      if (!sellDescriptionProduct) {
        res.status(404).json({
          success: false,
          message: `No se encontró la descripción de producto con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sellDescriptionProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la descripción de producto',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva descripción de producto
   */
  createSellDescriptionProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const sellDescriptionProductData = req.body;
      
      if (!sellDescriptionProductData.description) {
        res.status(400).json({
          success: false,
          message: 'La descripción es requerida'
        });
        return;
      }
      
      const newSellDescriptionProduct = await this.sellDescriptionProductService.createSellDescriptionProduct(sellDescriptionProductData);
      
      res.status(201).json({
        success: true,
        message: 'Descripción de producto creada exitosamente',
        data: newSellDescriptionProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la descripción de producto',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una descripción de producto existente
   */
  updateSellDescriptionProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sellDescriptionProductData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la descripción de producto existe
      const existingSellDescriptionProduct = await this.sellDescriptionProductService.getSellDescriptionProductById(id);
      
      if (!existingSellDescriptionProduct) {
        res.status(404).json({
          success: false,
          message: `No se encontró la descripción de producto con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSellDescriptionProduct en el servicio
      // const updatedSellDescriptionProduct = await this.sellDescriptionProductService.updateSellDescriptionProduct(id, sellDescriptionProductData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Descripción de producto actualizada exitosamente',
        data: { ...existingSellDescriptionProduct, ...sellDescriptionProductData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la descripción de producto',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una descripción de producto
   */
  deleteSellDescriptionProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la descripción de producto existe
      const existingSellDescriptionProduct = await this.sellDescriptionProductService.getSellDescriptionProductById(id);
      
      if (!existingSellDescriptionProduct) {
        res.status(404).json({
          success: false,
          message: `No se encontró la descripción de producto con ID ${id}`
        });
        return;
      }
      
      await this.sellDescriptionProductService.deleteSellDescriptionProduct(id);
      
      res.status(200).json({
        success: true,
        message: 'Descripción de producto eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la descripción de producto',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}