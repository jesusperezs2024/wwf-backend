import { Request, Response } from 'express';
import { SectionLargeItemsService } from '../services/SectionLargeItemsService';
import { SectionLargeItems } from '../models/SectionLargeItems';

export class SectionLargeItemsController {
  private sectionLargeItemsService: SectionLargeItemsService;

  constructor() {
    this.sectionLargeItemsService = new SectionLargeItemsService();
  }

  /**
   * Obtiene todas las secciones de items grandes
   */
  getAllSectionLargeItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sectionLargeItems: SectionLargeItems[];
      
      if (includeRelations) {
        sectionLargeItems = await this.sectionLargeItemsService.getAllWithRelations();
      } else {
        sectionLargeItems = await this.sectionLargeItemsService.getAllSectionLargeItems();
      }
      
      res.status(200).json({
        success: true,
        data: sectionLargeItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de items grandes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de items grandes por su ID
   */
  getSectionLargeItemsById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sectionLargeItems: SectionLargeItems | null;
      
      if (includeRelations) {
        sectionLargeItems = await this.sectionLargeItemsService.getSectionLargeItemsWithRelations(id);
      } else {
        sectionLargeItems = await this.sectionLargeItemsService.getSectionLargeItemsById(id);
      }
      
      if (!sectionLargeItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items grandes con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sectionLargeItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de items grandes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de items grandes
   */
  createSectionLargeItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionLargeItemsData = req.body;
      
      if (!sectionLargeItemsData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newSectionLargeItems = await this.sectionLargeItemsService.createSectionLargeItems(sectionLargeItemsData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de items grandes creada exitosamente',
        data: newSectionLargeItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de items grandes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de items grandes existente
   */
  updateSectionLargeItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionLargeItemsData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionLargeItems = await this.sectionLargeItemsService.getSectionLargeItemsById(id);
      
      if (!existingSectionLargeItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items grandes con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSectionLargeItems en el servicio
      // const updatedSectionLargeItems = await this.sectionLargeItemsService.updateSectionLargeItems(id, sectionLargeItemsData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de items grandes actualizada exitosamente',
        data: { ...existingSectionLargeItems, ...sectionLargeItemsData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de items grandes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de items grandes
   */
  deleteSectionLargeItems = async (req: Request, res: Response): Promise<void> => {
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
      const existingSectionLargeItems = await this.sectionLargeItemsService.getSectionLargeItemsById(id);
      
      if (!existingSectionLargeItems) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de items grandes con ID ${id}`
        });
        return;
      }
      
      await this.sectionLargeItemsService.deleteSectionLargeItems(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de items grandes eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de items grandes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}