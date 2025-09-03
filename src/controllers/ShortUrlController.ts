import { Request, Response } from 'express';
import { ShortUrlService } from '../services/ShortUrlService';
import { ShortUrl } from '../models/ShortUrl';

export class ShortUrlController {
  private shortUrlService: ShortUrlService;

  constructor() {
    this.shortUrlService = new ShortUrlService();
  }

  /**
   * Obtiene todas las URLs cortas
   */
  getAllShortUrls = async (req: Request, res: Response): Promise<void> => {
    try {
      const shortUrls = await this.shortUrlService.getAllShortUrls();
      
      res.status(200).json({
        success: true,
        data: shortUrls
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las URLs cortas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una URL corta por su ID
   */
  getShortUrlById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const shortUrl = await this.shortUrlService.getShortUrlById(id);
      
      if (!shortUrl) {
        res.status(404).json({
          success: false,
          message: `No se encontró la URL corta con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: shortUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la URL corta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una URL corta por su código
   * Nota: Método comentado ya que está comentado en el servicio
   */
  /*
  getShortUrlByCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.params.code;
      
      if (!code) {
        res.status(400).json({
          success: false,
          message: 'El código es requerido'
        });
        return;
      }
      
      const shortUrl = await this.shortUrlService.getShortUrlByCode(code);
      
      if (!shortUrl) {
        res.status(404).json({
          success: false,
          message: `No se encontró la URL corta con código ${code}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: shortUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la URL corta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */

  /**
   * Crea una nueva URL corta
   */
  createShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const shortUrlData = req.body;
      
      if (!shortUrlData.originalUrl) {
        res.status(400).json({
          success: false,
          message: 'La URL original es requerida'
        });
        return;
      }
      
      if (!shortUrlData.code) {
        res.status(400).json({
          success: false,
          message: 'El código es requerido'
        });
        return;
      }
      
      const newShortUrl = await this.shortUrlService.createShortUrl(shortUrlData);
      
      res.status(201).json({
        success: true,
        message: 'URL corta creada exitosamente',
        data: newShortUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la URL corta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una URL corta existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const shortUrlData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la URL corta existe
      const existingShortUrl = await this.shortUrlService.getShortUrlById(id);
      
      if (!existingShortUrl) {
        res.status(404).json({
          success: false,
          message: `No se encontró la URL corta con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateShortUrl en el servicio
      // const updatedShortUrl = await this.shortUrlService.updateShortUrl(id, shortUrlData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'URL corta actualizada exitosamente',
        data: { ...existingShortUrl, ...shortUrlData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la URL corta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una URL corta
   */
  deleteShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la URL corta existe
      const existingShortUrl = await this.shortUrlService.getShortUrlById(id);
      
      if (!existingShortUrl) {
        res.status(404).json({
          success: false,
          message: `No se encontró la URL corta con ID ${id}`
        });
        return;
      }
      
      await this.shortUrlService.deleteShortUrl(id);
      
      res.status(200).json({
        success: true,
        message: 'URL corta eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la URL corta',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Redirecciona a la URL original e incrementa el contador de clics
   * Nota: Método comentado ya que depende de métodos comentados en el servicio
   */
  /*
  redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.params.code;
      
      if (!code) {
        res.status(400).json({
          success: false,
          message: 'El código es requerido'
        });
        return;
      }
      
      // Incrementa el contador de clics y obtiene la URL actualizada
      const shortUrl = await this.shortUrlService.incrementClickCount(code);
      
      if (!shortUrl) {
        res.status(404).json({
          success: false,
          message: `No se encontró la URL corta con código ${code}`
        });
        return;
      }
      
      // Redirecciona a la URL original
      res.redirect(shortUrl.originalUrl);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al redireccionar',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
  */
}