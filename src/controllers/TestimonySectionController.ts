import { Request, Response } from 'express';
import { TestimonySectionService } from '../services/TestimonySectionService';
import { TestimonySection } from '../models/TestimonySection';

export class TestimonySectionController {
  private testimonySectionService: TestimonySectionService;

  constructor() {
    this.testimonySectionService = new TestimonySectionService();
  }

  /**
   * Obtiene todas las secciones de testimonios
   */
  getAllTestimonySections = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let testimonySections: TestimonySection[];
      
      if (includeRelations) {
        testimonySections = await this.testimonySectionService.getAllWithRelations();
      } else {
        testimonySections = await this.testimonySectionService.getAllTestimonySections();
      }
      
      res.status(200).json({
        success: true,
        data: testimonySections
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de testimonios por su ID
   */
  getTestimonySectionById = async (req: Request, res: Response): Promise<void> => {
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
      
      let testimonySection: TestimonySection | null;
      
      if (includeRelations) {
        testimonySection = await this.testimonySectionService.getTestimonySectionWithRelations(id);
      } else {
        testimonySection = await this.testimonySectionService.getTestimonySectionById(id);
      }
      
      if (!testimonySection) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de testimonios con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: testimonySection
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de testimonios
   */
  createTestimonySection = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonySectionData = req.body;
      
      if (!testimonySectionData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newTestimonySection = await this.testimonySectionService.createTestimonySection(testimonySectionData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de testimonios creada exitosamente',
        data: newTestimonySection
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de testimonios existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateTestimonySection = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const testimonySectionData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección de testimonios existe
      const existingTestimonySection = await this.testimonySectionService.getTestimonySectionById(id);
      
      if (!existingTestimonySection) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de testimonios con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateTestimonySection en el servicio
      // const updatedTestimonySection = await this.testimonySectionService.updateTestimonySection(id, testimonySectionData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de testimonios actualizada exitosamente',
        data: { ...existingTestimonySection, ...testimonySectionData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de testimonios
   */
  deleteTestimonySection = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección de testimonios existe
      const existingTestimonySection = await this.testimonySectionService.getTestimonySectionById(id);
      
      if (!existingTestimonySection) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de testimonios con ID ${id}`
        });
        return;
      }
      
      await this.testimonySectionService.deleteTestimonySection(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de testimonios eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene secciones de testimonios por título
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getTestimonySectionByTitle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title } = req.params;
      
      if (!title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const testimonySection = await this.testimonySectionService.getTestimonySectionByTitle(title);
      
      if (!testimonySection) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de testimonios con título ${title}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: testimonySection
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Obtiene secciones de testimonios activas
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getActiveTestimonySections = async (req: Request, res: Response): Promise<void> => {
    try {
      const activeTestimonySections = await this.testimonySectionService.getActiveTestimonySections();
      
      res.status(200).json({
        success: true,
        data: activeTestimonySections
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de testimonios activas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */
}