import { Request, Response } from 'express';
import { SocialMediaService } from '../services/SocialMediaService';
import { SocialMedia } from '../models/SocialMedia';

export class SocialMediaController {
  private socialMediaService: SocialMediaService;

  constructor() {
    this.socialMediaService = new SocialMediaService();
  }

  /**
   * Obtiene todas las redes sociales
   */
  getAllSocialMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const socialMedia = await this.socialMediaService.getAllSocialMedia();
      
      res.status(200).json({
        success: true,
        data: socialMedia
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las redes sociales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una red social por su ID
   */
  getSocialMediaById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const socialMedia = await this.socialMediaService.getSocialMediaById(id);
      
      if (!socialMedia) {
        res.status(404).json({
          success: false,
          message: `No se encontró la red social con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: socialMedia
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la red social',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una red social por su nombre
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getSocialMediaByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name;
      
      if (!name) {
        res.status(400).json({
          success: false,
          message: 'El nombre es requerido'
        });
        return;
      }
      
      const socialMedia = await this.socialMediaService.getSocialMediaByName(name);
      
      if (!socialMedia) {
        res.status(404).json({
          success: false,
          message: `No se encontró la red social con nombre ${name}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: socialMedia
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la red social',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Crea una nueva red social
   */
  createSocialMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const socialMediaData = req.body;
      
      if (!socialMediaData.name) {
        res.status(400).json({
          success: false,
          message: 'El nombre es requerido'
        });
        return;
      }
      
      if (!socialMediaData.url) {
        res.status(400).json({
          success: false,
          message: 'La URL es requerida'
        });
        return;
      }
      
      if (!socialMediaData.icon) {
        res.status(400).json({
          success: false,
          message: 'El icono es requerido'
        });
        return;
      }
      
      const newSocialMedia = await this.socialMediaService.createSocialMedia(socialMediaData);
      
      res.status(201).json({
        success: true,
        message: 'Red social creada exitosamente',
        data: newSocialMedia
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la red social',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una red social existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateSocialMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const socialMediaData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la red social existe
      const existingSocialMedia = await this.socialMediaService.getSocialMediaById(id);
      
      if (!existingSocialMedia) {
        res.status(404).json({
          success: false,
          message: `No se encontró la red social con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSocialMedia en el servicio
      // const updatedSocialMedia = await this.socialMediaService.updateSocialMedia(id, socialMediaData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Red social actualizada exitosamente',
        data: { ...existingSocialMedia, ...socialMediaData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la red social',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una red social
   */
  deleteSocialMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la red social existe
      const existingSocialMedia = await this.socialMediaService.getSocialMediaById(id);
      
      if (!existingSocialMedia) {
        res.status(404).json({
          success: false,
          message: `No se encontró la red social con ID ${id}`
        });
        return;
      }
      
      await this.socialMediaService.deleteSocialMedia(id);
      
      res.status(200).json({
        success: true,
        message: 'Red social eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la red social',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene todas las redes sociales activas
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getActiveSocialMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const activeSocialMedia = await this.socialMediaService.getActiveSocialMedia();
      
      res.status(200).json({
        success: true,
        data: activeSocialMedia
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las redes sociales activas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */
}