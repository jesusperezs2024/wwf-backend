import { Request, Response } from "express";
import { SectionCardsService } from "../services/SectionCardsService";
import { DeepPartial } from "typeorm";
import { SectionCards } from "../models/SectionCards";

export class SectionCardsController {
  private sectionCardsService: SectionCardsService;

  constructor() {
    this.sectionCardsService = new SectionCardsService();
  }

  /**
   * Obtiene todas las secciones de tarjetas
   */
  getAllSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.relations === 'true';
      
      let sectionCards;
      if (withRelations) {
        sectionCards = await this.sectionCardsService.getAllWithRelations();
      } else {
        sectionCards = await this.sectionCardsService.getAllSectionCards();
      }
      
      res.status(200).json(sectionCards);
    } catch (error) {
      console.error("Error al obtener secciones de tarjetas:", error);
      res.status(500).json({ message: "Error al obtener secciones de tarjetas" });
    }
  };

  /**
   * Obtiene una sección de tarjetas por su ID
   */
  getSectionCardsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const withRelations = req.query.relations === 'true';
      
      let sectionCards;
      if (withRelations) {
        sectionCards = await this.sectionCardsService.getSectionCardsWithRelations(id);
      } else {
        sectionCards = await this.sectionCardsService.getSectionCardsById(id);
      }
      
      if (!sectionCards) {
        res.status(404).json({ message: `Sección de tarjetas con ID ${id} no encontrada` });
        return;
      }
      
      res.status(200).json(sectionCards);
    } catch (error) {
      console.error(`Error al obtener sección de tarjetas con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener sección de tarjetas" });
    }
  };

  /**
   * Crea una nueva sección de tarjetas
   */
  createSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionCardsData: DeepPartial<SectionCards> = req.body;
      const newSectionCards = await this.sectionCardsService.createSectionCards(sectionCardsData);
      
      res.status(201).json(newSectionCards);
    } catch (error) {
      console.error("Error al crear sección de tarjetas:", error);
      res.status(500).json({ message: "Error al crear sección de tarjetas" });
    }
  };

  /**
   * Actualiza una sección de tarjetas existente
   */
  updateSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionCardsData: DeepPartial<SectionCards> = req.body;
      
      // Verificar que existe la sección antes de actualizar
      const existingSectionCards = await this.sectionCardsService.getSectionCardsById(id);
      if (!existingSectionCards) {
        res.status(404).json({ message: `Sección de tarjetas con ID ${id} no encontrada` });
        return;
      }
      
      // Nota: Esto asume que se implementará el método updateSectionCards en el servicio
      // que parece estar incompleto en el código original
      const updatedSectionCards = await this.sectionCardsService.updateSectionCards(id, sectionCardsData);
      
      res.status(200).json(updatedSectionCards);
    } catch (error) {
      console.error(`Error al actualizar sección de tarjetas con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al actualizar sección de tarjetas" });
    }
  };

  /**
   * Elimina una sección de tarjetas existente
   */
  deleteSectionCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      // Verificar que existe la sección antes de eliminar
      const existingSectionCards = await this.sectionCardsService.getSectionCardsById(id);
      if (!existingSectionCards) {
        res.status(404).json({ message: `Sección de tarjetas con ID ${id} no encontrada` });
        return;
      }
      
      // Nota: Esto asume que se implementará el método deleteSectionCards en el servicio
      await this.sectionCardsService.deleteSectionCards(id);
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar sección de tarjetas con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al eliminar sección de tarjetas" });
    }
  };
}