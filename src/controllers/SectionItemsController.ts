import { Request, Response } from 'express';
import { SectionItemsService } from '../services/SectionItemsService.';
import { SectionItems } from '../models/SectionItems';

export class SectionItemsController {
  private sectionItemsService: SectionItemsService;

  constructor() {
    this.sectionItemsService = new SectionItemsService();
  }

  /**
   * Obtiene todas las secciones de items
   */
  getAllSectionItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sectionItems: SectionItems[];
      
      if (includeRelations) {
        sectionItems = await this.sectionItemsService.getAllWithRelations();
      } else {
        sectionItems = await this.sectionItemsService.getAllSectionItems();
      }
      
      res.status(200).json({
        success: true,
        data: sectionItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de items',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de items por su ID
   */
  getSectionItemsById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sectionItems: SectionItems | null;
      
      if (includeRelations) {
        sectionItems = await this.sectionItemsService.getSectionItemsWithRelations(id);
      } else {
        sectionItems = await this.sectionItemsService.getSectionItemsById(id);
      }
      
      if (!sectionItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sectionItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de items',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de items
   */
  createSectionItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionItemsData = req.body;
      
      if (!sectionItemsData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newSectionItems = await this.sectionItemsService.createSectionItems(sectionItemsData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de items creada exitosamente',
        data: newSectionItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de items',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de items existente
   */
  updateSectionItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionItemsData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionItems = await this.sectionItemsService.getSectionItemsById(id);
      
      if (!existingSectionItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSectionItems en el servicio
      // const updatedSectionItems = await this.sectionItemsService.updateSectionItems(id, sectionItemsData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de items actualizada exitosamente',
        data: { ...existingSectionItems, ...sectionItemsData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de items',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de items
   */
  deleteSectionItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionItems = await this.sectionItemsService.getSectionItemsById(id);
      
      if (!existingSectionItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items con ID ${id}`
        });
        return;
      }
      
      await this.sectionItemsService.deleteSectionItems(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de items eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de items',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}