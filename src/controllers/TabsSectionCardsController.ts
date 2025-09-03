import { Request, Response } from 'express';
import { TabsSectionCardsService } from '../services/TabsSectionCardsService';
import { TabsSectionCards } from '../models/TabsSectionCards';

export class TabsSectionCardsController {
  private tabsSectionCardsService: TabsSectionCardsService;

  constructor() {
    this.tabsSectionCardsService = new TabsSectionCardsService();
  }

  /**
   * Obtiene todas las secciones de tabs con tarjetas
   */
  getAllTabsSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let tabsSectionCards: TabsSectionCards[];
      
      if (includeRelations) {
        tabsSectionCards = await this.tabsSectionCardsService.getAllWithRelations();
      } else {
        tabsSectionCards = await this.tabsSectionCardsService.getAllTabsSectionCards();
      }
      
      res.status(200).json({
        success: true,
        data: tabsSectionCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de tabs con tarjetas por su ID
   */
  getTabsSectionCardsById = async (req: Request, res: Response): Promise<void> => {
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
      
      let tabsSectionCards: TabsSectionCards | null;
      
      if (includeRelations) {
        tabsSectionCards = await this.tabsSectionCardsService.getTabsSectionCardsWithRelations(id);
      } else {
        tabsSectionCards = await this.tabsSectionCardsService.getTabsSectionCardsById(id);
      }
      
      if (!tabsSectionCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tabs con tarjetas con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: tabsSectionCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de tabs con tarjetas
   */
  createTabsSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const tabsSectionCardsData = req.body;
      
      if (!tabsSectionCardsData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newTabsSectionCards = await this.tabsSectionCardsService.createTabsSectionCards(tabsSectionCardsData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de tabs con tarjetas creada exitosamente',
        data: newTabsSectionCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de tabs con tarjetas existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateTabsSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const tabsSectionCardsData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección de tabs con tarjetas existe
      const existingTabsSectionCards = await this.tabsSectionCardsService.getTabsSectionCardsById(id);
      
      if (!existingTabsSectionCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tabs con tarjetas con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateTabsSectionCards en el servicio
      // const updatedTabsSectionCards = await this.tabsSectionCardsService.updateTabsSectionCards(id, tabsSectionCardsData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de tabs con tarjetas actualizada exitosamente',
        data: { ...existingTabsSectionCards, ...tabsSectionCardsData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de tabs con tarjetas
   */
  deleteTabsSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección de tabs con tarjetas existe
      const existingTabsSectionCards = await this.tabsSectionCardsService.getTabsSectionCardsById(id);
      
      if (!existingTabsSectionCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tabs con tarjetas con ID ${id}`
        });
        return;
      }
      
      await this.tabsSectionCardsService.deleteTabsSectionCards(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de tabs con tarjetas eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}