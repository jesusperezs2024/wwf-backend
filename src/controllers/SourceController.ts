import { Request, Response } from 'express';
import { SourceService } from '../services/SourceService';
import { Source } from '../models/Source';

export class SourceController {
  private sourceService: SourceService;

  constructor() {
    this.sourceService = new SourceService();
  }

  /**
   * Obtiene todas las fuentes
   */
  getAllSources = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sources: Source[];
      
      if (includeRelations) {
        sources = await this.sourceService.getAllWithRelations();
      } else {
        sources = await this.sourceService.getAllSources();
      }
      
      res.status(200).json({
        success: true,
        data: sources
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las fuentes',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una fuente por su ID
   */
  getSourceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const source = await this.sourceService.getSourceById(id);
      
      if (!source) {
        res.status(404).json({
          success: false,
          message: `No se encontró la fuente con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: source
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la fuente',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una fuente por su nombre
   */
  getSourceByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name;
      
      if (!name) {
        res.status(400).json({
          success: false,
          message: 'El nombre es requerido'
        });
        return;
      }
      
      const source = await this.sourceService.getSourceByName(name);
      
      if (!source) {
        res.status(404).json({
          success: false,
          message: `No se encontró la fuente con nombre ${name}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: source
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la fuente',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva fuente
   */
  createSource = async (req: Request, res: Response): Promise<void> => {
    try {
      const sourceData = req.body;
      
      if (!sourceData.name) {
        res.status(400).json({
          success: false,
          message: 'El nombre es requerido'
        });
        return;
      }
      
      const newSource = await this.sourceService.createSource(sourceData);
      
      res.status(201).json({
        success: true,
        message: 'Fuente creada exitosamente',
        data: newSource
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la fuente',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una fuente existente
   * Nota: Este método está implementado de forma temporal ya que está comentado en el servicio
   */
  updateSource = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sourceData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la fuente existe
      const existingSource = await this.sourceService.getSourceById(id);
      
      if (!existingSource) {
        res.status(404).json({
          success: false,
          message: `No se encontró la fuente con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSource en el servicio
      // const updatedSource = await this.sourceService.updateSource(id, sourceData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Fuente actualizada exitosamente',
        data: { ...existingSource, ...sourceData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la fuente',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una fuente
   */
  deleteSource = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la fuente existe
      const existingSource = await this.sourceService.getSourceById(id);
      
      if (!existingSource) {
        res.status(404).json({
          success: false,
          message: `No se encontró la fuente con ID ${id}`
        });
        return;
      }
      
      await this.sourceService.deleteSource(id);
      
      res.status(200).json({
        success: true,
        message: 'Fuente eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la fuente',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}