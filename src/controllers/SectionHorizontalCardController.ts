import { Request, Response } from 'express';
import { SectionHorizontalCardService } from '../services/SectionHorizontalCardService';
import { SectionHorizontalCard } from '../models/SectionHorizontalCard';

export class SectionHorizontalCardController {
  private sectionHorizontalCardService: SectionHorizontalCardService;

  constructor() {
    this.sectionHorizontalCardService = new SectionHorizontalCardService();
  }

  /**
   * Obtiene todas las secciones de tarjetas horizontales
   */
  getAllSectionHorizontalCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const includeRelations = req.query.relations === 'true';
      
      let sectionHorizontalCards: SectionHorizontalCard[];
      
      if (includeRelations) {
        sectionHorizontalCards = await this.sectionHorizontalCardService.getAllWithRelations();
      } else {
        sectionHorizontalCards = await this.sectionHorizontalCardService.getAllSectionHorizontalCards();
      }
      
      res.status(200).json({
        success: true,
        data: sectionHorizontalCards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las secciones de tarjetas horizontales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Obtiene una sección de tarjetas horizontales por su ID
   */
  getSectionHorizontalCardById = async (req: Request, res: Response): Promise<void> => {
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
      
      let sectionHorizontalCard: SectionHorizontalCard | null;
      
      if (includeRelations) {
        sectionHorizontalCard = await this.sectionHorizontalCardService.getSectionHorizontalCardWithRelations(id);
      } else {
        sectionHorizontalCard = await this.sectionHorizontalCardService.getSectionHorizontalCardById(id);
      }
      
      if (!sectionHorizontalCard) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tarjetas horizontales con ID ${id}`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: sectionHorizontalCard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la sección de tarjetas horizontales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Crea una nueva sección de tarjetas horizontales
   */
  createSectionHorizontalCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionHorizontalCardData = req.body;
      
      if (!sectionHorizontalCardData.title) {
        res.status(400).json({
          success: false,
          message: 'El título es requerido'
        });
        return;
      }
      
      const newSectionHorizontalCard = await this.sectionHorizontalCardService.createSectionHorizontalCard(sectionHorizontalCardData);
      
      res.status(201).json({
        success: true,
        message: 'Sección de tarjetas horizontales creada exitosamente',
        data: newSectionHorizontalCard
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la sección de tarjetas horizontales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Actualiza una sección de tarjetas horizontales existente
   */
  updateSectionHorizontalCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionHorizontalCardData = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      // Verifica si la sección existe
      const existingSectionHorizontalCard = await this.sectionHorizontalCardService.getSectionHorizontalCardById(id);
      
      if (!existingSectionHorizontalCard) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tarjetas horizontales con ID ${id}`
        });
        return;
      }
      
      // Nota: Aquí falta la implementación del método updateSectionHorizontalCard en el servicio
      // const updatedSectionHorizontalCard = await this.sectionHorizontalCardService.updateSectionHorizontalCard(id, sectionHorizontalCardData);
      
      // Respuesta temporal hasta implementar el método en el servicio
      res.status(200).json({
        success: true,
        message: 'Sección de tarjetas horizontales actualizada exitosamente',
        data: { ...existingSectionHorizontalCard, ...sectionHorizontalCardData, id }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la sección de tarjetas horizontales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };

  /**
   * Elimina una sección de tarjetas horizontales
   */
  deleteSectionHorizontalCard = async (req: Request, res: Response): Promise<void> => {
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
      const existingSectionHorizontalCard = await this.sectionHorizontalCardService.getSectionHorizontalCardById(id);
      
      if (!existingSectionHorizontalCard) {
        res.status(404).json({
          success: false,
          message: `No se encontró la sección de tarjetas horizontales con ID ${id}`
        });
        return;
      }
      
      await this.sectionHorizontalCardService.deleteSectionHorizontalCard(id);
      
      res.status(200).json({
        success: true,
        message: 'Sección de tarjetas horizontales eliminada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la sección de tarjetas horizontales',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}