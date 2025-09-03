import { Request, Response } from 'express';
import { TabsService } from '../services/TabsService';
import { Tabs } from '../models/Tabs';

export class TabsController {
  private tabsService: TabsService;

  constructor() {
    this.tabsService = new TabsService();
  }

  /**
   * Obtiene todos los tabs
   */
  getAllTabs = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let tabs: Tabs[];
      
      if (includeRelations) {
        tabs = await this.tabsService.getAllWithRelations();
      } else {
        tabs = await this.tabsService.getAllTabs();
      }
      
      res.status(200).json({
        success: true,
        data: tabs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tabs',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene un tab por su ID
   */
  getTabsById = async (req: Request, res: Response): Promise<void> => {
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
      
      let tabs: Tabs | null;
      
      if (includeRelations) {
        tabs = await this.tabsService.getTabsWithRelations(id);
      } else {
        tabs = await this.tabsService.getTabsById(id);
      }
      
      if (!tabs) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: tabs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el tab',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea un nuevo tab
   */
  createTabs = async (req: Request, res: Response): Promise<void> => {
    try {
      const tabsData = req.body;
      
      if (!tabsData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newTabs = await this.tabsService.createTabs(tabsData);
      
      res.status(201).json({
        success: true,
        message: 'Tab creado exitosamente',
        data: newTabs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el tab',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza un tab existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateTabs = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const tabsData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el tab existe
      const existingTabs = await this.tabsService.getTabsById(id);
      
      if (!existingTabs) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateTabs en el servicio
      // const updatedTabs = await this.tabsService.updateTabs(id, tabsData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Tab actualizado exitosamente',
        data: { ...existingTabs, ...tabsData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el tab',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina un tab
   */
  deleteTabs = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el tab existe
      const existingTabs = await this.tabsService.getTabsById(id);
      
      if (!existingTabs) {
        res.status(404).json({
          success: false,
          message: `No se encontró el tab con ID ${id}`
        });
        return;
      }
      
      await this.tabsService.deleteTabs(id);
      
      res.status(200).json({
        success: true,
        message: 'Tab eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el tab',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}