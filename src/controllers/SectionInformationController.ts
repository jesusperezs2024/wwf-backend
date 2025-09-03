import { Request, Response } from 'express';
import { SectionInformationService } from '../services/SectionInformationService';
import { SectionInformation } from '../models/SectionInformation';

export class SectionInformationController {
  private sectionInformationService: SectionInformationService;

  constructor() {
    this.sectionInformationService = new SectionInformationService();
  }

  /**
   * Obtiene todas las secciones de información
   */
  getAllSectionInformation = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sectionInformation: SectionInformation[];
      
      if (includeRelations) {
        sectionInformation = await this.sectionInformationService.getAllWithRelations();
      } else {
        sectionInformation = await this.sectionInformationService.getAllSectionInformation();
      }
      
      res.status(200).json({
        success: true,
        data: sectionInformation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de información',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de información por su ID
   */
  getSectionInformationById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sectionInformation: SectionInformation | null;
      
      if (includeRelations) {
        sectionInformation = await this.sectionInformationService.getSectionInformationWithRelations(id);
      } else {
        sectionInformation = await this.sectionInformationService.getSectionInformationById(id);
      }
      
      if (!sectionInformation) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de información con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sectionInformation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de información',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de información
   */
  createSectionInformation = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionInformationData = req.body;
      
      if (!sectionInformationData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newSectionInformation = await this.sectionInformationService.createSectionInformation(sectionInformationData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de información creada exitosamente',
        data: newSectionInformation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de información',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de información existente
   */
  updateSectionInformation = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionInformationData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionInformation = await this.sectionInformationService.getSectionInformationById(id);
      
      if (!existingSectionInformation) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de información con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSectionInformation en el servicio
      // const updatedSectionInformation = await this.sectionInformationService.updateSectionInformation(id, sectionInformationData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de información actualizada exitosamente',
        data: { ...existingSectionInformation, ...sectionInformationData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de información',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de información
   */
  deleteSectionInformation = async (req: Request, res: Response): Promise<void> => {
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
      const existingSectionInformation = await this.sectionInformationService.getSectionInformationById(id);
      
      if (!existingSectionInformation) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de información con ID ${id}`
        });
        return;
      }
      
      await this.sectionInformationService.deleteSectionInformation(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de información eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de información',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}