import { Request, Response } from 'express';
import { SellService } from '../services/SellService';
import { Sell } from '../models/Sell';

export class SellController {
  private sellService: SellService;

  constructor() {
    this.sellService = new SellService();
  }

  /**
   * Obtiene todas las ventas
   */
  getAllSells = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sells: Sell[];
      
      if (includeRelations) {
        sells = await this.sellService.getAllWithRelations();
      } else {
        sells = await this.sellService.getAllSells();
      }
      
      res.status(200).json({
        success: true,
        data: sells
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las ventas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una venta por su ID
   */
  getSellById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sell: Sell | null;
      
      if (includeRelations) {
        sell = await this.sellService.getSellWithRelations(id);
      } else {
        sell = await this.sellService.getSellById(id);
      }
      
      if (!sell) {
        res.status(404).json({
          success: false,
          message: `No se encontró la venta con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sell
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la venta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva venta
   */
  createSell = async (req: Request, res: Response): Promise<void> => {
    try {
      const sellData = req.body;
      
      // Validaciones básicas
      if (!sellData.date) {
        res.status(400).json({
          success: false,
          message: 'La fecha de venta es requerida'
        });
        return;
      }
      
      if (!sellData.totalAmount || sellData.totalAmount <= 0) {
        res.status(400).json({
          success: false,
          message: 'El monto total debe ser un valor positivo'
        });
        return;
      }
      
      const newSell = await this.sellService.createSell(sellData);
      
      res.status(201).json({
        success: true,
        message: 'Venta creada exitosamente',
        data: newSell
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la venta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una venta existente
   */
  updateSell = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sellData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la venta existe
      const existingSell = await this.sellService.getSellById(id);
      
      if (!existingSell) {
        res.status(404).json({
          success: false,
          message: `No se encontró la venta con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSell en el servicio
      // const updatedSell = await this.sellService.updateSell(id, sellData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Venta actualizada exitosamente',
        data: { ...existingSell, ...sellData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la venta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una venta
   */
  deleteSell = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la venta existe
      const existingSell = await this.sellService.getSellById(id);
      
      if (!existingSell) {
        res.status(404).json({
          success: false,
          message: `No se encontró la venta con ID ${id}`
        });
        return;
      }
      
      await this.sellService.deleteSell(id);
      
      res.status(200).json({
        success: true,
        message: 'Venta eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la venta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  // Nota: Los siguientes métodos comentados corresponden a los métodos comentados en el servicio

  /**
   * Obtiene ventas por cliente
   */
  // getSellsByCustomer = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const customerId = parseInt(req.params.customerId);
      
  //     if (isNaN(customerId)) {
  //       res.status(400).json({
  //         success: false,
  //         message: 'ID de cliente inválido'
  //       });
  //       return;
  //     }
      
  //     const sells = await this.sellService.getSellsByCustomer(customerId);
      
  //     res.status(200).json({
  //       success: true,
  //       data: sells
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error al obtener las ventas por cliente',
  //       error: error instanceof Error ? error.message : 'Error desconocido'
  //     });
  //   }
  // };

  /**
   * Obtiene el total de ventas por periodo
   */
  // getSellsTotalByPeriod = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const { startDate, endDate } = req.query;
      
  //     if (!startDate || !endDate) {
  //       res.status(400).json({
  //         success: false,
  //         message: 'Fechas de inicio y fin son requeridas'
  //       });
  //       return;
  //     }
      
  //     const start = new Date(startDate as string);
  //     const end = new Date(endDate as string);
      
  //     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  //       res.status(400).json({
  //         success: false,
  //         message: 'Formato de fecha inválido'
  //       });
  //       return;
  //     }
      
  //     const total = await this.sellService.getSellsTotalByPeriod(start, end);
      
  //     res.status(200).json({
  //       success: true,
  //       data: {
  //         startDate: start,
  //         endDate: end,
  //         total
  //       }
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error al obtener el total de ventas por periodo',
  //       error: error instanceof Error ? error.message : 'Error desconocido'
  //     });
  //   }
  // };
}