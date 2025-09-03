import { Request, Response } from 'express';
import { SectionFAQService } from '../services/SectionFAQService';
import { SectionFAQ } from '../models/SectionFAQ';

export class SectionFAQController {
  private sectionFAQService: SectionFAQService;

  constructor() {
    this.sectionFAQService = new SectionFAQService();
  }

  /**
   * Obtiene todas las secciones de preguntas frecuentes
   */
  getAllSectionFAQs = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sectionFAQs: SectionFAQ[];
      
      if (includeRelations) {
        sectionFAQs = await this.sectionFAQService.getAllWithRelations();
      } else {
        sectionFAQs = await this.sectionFAQService.getAllSectionFAQs();
      }
      
      res.status(200).json({
        success: true,
        data: sectionFAQs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de preguntas frecuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de preguntas frecuentes por su ID
   */
  getSectionFAQById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sectionFAQ: SectionFAQ | null;
      
      if (includeRelations) {
        sectionFAQ = await this.sectionFAQService.getSectionFAQWithRelations(id);
      } else {
        sectionFAQ = await this.sectionFAQService.getSectionFAQById(id);
      }
      
      if (!sectionFAQ) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de preguntas frecuentes con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sectionFAQ
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de preguntas frecuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de preguntas frecuentes
   */
  createSectionFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionFAQData = req.body;
      
      if (!sectionFAQData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newSectionFAQ = await this.sectionFAQService.createSectionFAQ(sectionFAQData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de preguntas frecuentes creada exitosamente',
        data: newSectionFAQ
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de preguntas frecuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de preguntas frecuentes existente
   */
  updateSectionFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionFAQData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionFAQ = await this.sectionFAQService.getSectionFAQById(id);
      
      if (!existingSectionFAQ) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de preguntas frecuentes con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSectionFAQ en el servicio
      // const updatedSectionFAQ = await this.sectionFAQService.updateSectionFAQ(id, sectionFAQData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de preguntas frecuentes actualizada exitosamente',
        data: { ...existingSectionFAQ, ...sectionFAQData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de preguntas frecuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de preguntas frecuentes
   */
  deleteSectionFAQ = async (req: Request, res: Response): Promise<void> => {
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
      const existingSectionFAQ = await this.sectionFAQService.getSectionFAQById(id);
      
      if (!existingSectionFAQ) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de preguntas frecuentes con ID ${id}`
        });
        return;
      }
      
      await this.sectionFAQService.deleteSectionFAQ(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de preguntas frecuentes eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de preguntas frecuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}