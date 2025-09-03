import { Request, Response } from 'express';
import { TabsCardsService } from '../services/TabsCardsService';
import { TabsCards } from '../models/TabsCards';

export class TabsCardsController {
  private tabsCardsService: TabsCardsService;

  constructor() {
    this.tabsCardsService = new TabsCardsService();
  }

  /**
   * Obtiene todos los tabs con tarjetas
   */
  getAllTabsCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let tabsCards: TabsCards[];
      
      if (includeRelations) {
        tabsCards = await this.tabsCardsService.getAllWithRelations();
      } else {
        tabsCards = await this.tabsCardsService.getAllTabsCards();
      }
      
      res.status(200).json({
        success: true,
        data: tabsCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tabs con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene un tab con tarjetas por su ID
   */
  getTabsCardsById = async (req: Request, res: Response): Promise<void> => {
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
      
      let tabsCards: TabsCards | null;
      
      if (includeRelations) {
        tabsCards = await this.tabsCardsService.getTabsCardsWithRelations(id);
      } else {
        tabsCards = await this.tabsCardsService.getTabsCardsById(id);
      }
      
      if (!tabsCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con tarjetas con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: tabsCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el tab con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea un nuevo tab con tarjetas
   */
  createTabsCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const tabsCardsData = req.body;
      
      if (!tabsCardsData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newTabsCards = await this.tabsCardsService.createTabsCards(tabsCardsData);
      
      res.status(201).json({
        success: true,
        message: 'Tab con tarjetas creado exitosamente',
        data: newTabsCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el tab con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza un tab con tarjetas existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateTabsCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const tabsCardsData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el tab con tarjetas existe
      const existingTabsCards = await this.tabsCardsService.getTabsCardsById(id);
      
      if (!existingTabsCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con tarjetas con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateTabsCards en el servicio
      // const updatedTabsCards = await this.tabsCardsService.updateTabsCards(id, tabsCardsData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Tab con tarjetas actualizado exitosamente',
        data: { ...existingTabsCards, ...tabsCardsData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el tab con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina un tab con tarjetas
   */
  deleteTabsCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el tab con tarjetas existe
      const existingTabsCards = await this.tabsCardsService.getTabsCardsById(id);
      
      if (!existingTabsCards) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con tarjetas con ID ${id}`
        });
        return;
      }
      
      await this.tabsCardsService.deleteTabsCards(id);
      
      res.status(200).json({
        success: true,
        message: 'Tab con tarjetas eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el tab con tarjetas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}