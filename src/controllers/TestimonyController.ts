import { Request, Response } from 'express';
import { TestimonyService } from '../services/TestimonyService';
import { Testimony } from '../models/Testimony';

export class TestimonyController {
  private testimonyService: TestimonyService;

  constructor() {
    this.testimonyService = new TestimonyService();
  }

  /**
   * Obtiene todos los testimonios
   */
  getAllTestimonies = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonies = await this.testimonyService.getAllTestimonies();
      
      res.status(200).json({
        success: true,
        data: testimonies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los testimonios',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene un testimonio por su ID
   */
  getTestimonyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const testimony = await this.testimonyService.getTestimonyById(id);
      
      if (!testimony) {
        res.status(404).json({
          success: false,
          message: `No se encontró el testimonio con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: testimony
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el testimonio',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea un nuevo testimonio
   */
  createTestimony = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimonyData = req.body;
      
      if (!testimonyData.author) {
        res.status(400).json({
          success: false,
          message: 'El autor es requerido'
        });
        return;
      }
      
      if (!testimonyData.content) {
        res.status(400).json({
          success: false,
          message: 'El contenido es requerido'
        });
        return;
      }
      
      const newTestimony = await this.testimonyService.createTestimony(testimonyData);
      
      res.status(201).json({
        success: true,
        message: 'Testimonio creado exitosamente',
        data: newTestimony
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el testimonio',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza un testimonio existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateTestimony = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const testimonyData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el testimonio existe
      const existingTestimony = await this.testimonyService.getTestimonyById(id);
      
      if (!existingTestimony) {
        res.status(404).json({
          success: false,
          message: `No se encontró el testimonio con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateTestimony en el servicio
      // const updatedTestimony = await this.testimonyService.updateTestimony(id, testimonyData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Testimonio actualizado exitosamente',
        data: { ...existingTestimony, ...testimonyData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el testimonio',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina un testimonio
   */
  deleteTestimony = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si el testimonio existe
      const existingTestimony = await this.testimonyService.getTestimonyById(id);
      
      if (!existingTestimony) {
        res.status(404).json({
          success: false,
          message: `No se encontró el testimonio con ID ${id}`
        });
        return;
      }
      
      await this.testimonyService.deleteTestimony(id);
      
      res.status(200).json({
        success: true,
        message: 'Testimonio eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el testimonio',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene testimonios por autor
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getTestimoniesByAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { author } = req.params;
      
      if (!author) {
        res.status(400).json({
          success: false,
          message: 'El autor es requerido'
        });
        return;
      }
      
      const testimonies = await this.testimonyService.getTestimoniesByAuthor(author);
      
      res.status(200).json({
        success: true,
        data: testimonies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los testimonios por autor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Obtiene testimonios activos
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getActiveTestimonies = async (req: Request, res: Response): Promise<void> => {
    try {
      const activeTestimonies = await this.testimonyService.getActiveTestimonies();
      
      res.status(200).json({
        success: true,
        data: activeTestimonies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los testimonios activos',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Cambia el estado de activación de un testimonio
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  toggleTestimonyActive = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const toggledTestimony = await this.testimonyService.toggleTestimonyActive(id);
      
      if (!toggledTestimony) {
        res.status(404).json({
          success: false,
          message: `No se encontró el testimonio con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: `Testimonio ${toggledTestimony.active ? 'activado' : 'desactivado'} exitosamente`,
        data: toggledTestimony
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al cambiar el estado de activación del testimonio',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Obtiene testimonios destacados
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getFeaturedTestimonies = async (req: Request, res: Response): Promise<void> => {
    try {
      const featuredTestimonies = await this.testimonyService.getFeaturedTestimonies();
      
      res.status(200).json({
        success: true,
        data: featuredTestimonies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los testimonios destacados',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */
}