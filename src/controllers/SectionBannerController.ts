import { Request, Response } from "express";
import { SectionBannerService } from "../services/SectionBannerService";
import { SectionBanner } from "../models/SectionBanner";

export class SectionBannerController {
  private sectionBannerService: SectionBannerService;

  constructor() {
    this.sectionBannerService = new SectionBannerService();
  }

  /**
   * Obtiene todas las secciones de banner
   */
  getAllSectionBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionBanners = await this.sectionBannerService.getAllSectionBanners();
      res.status(200).json(sectionBanners);
    } catch (error) {
      console.error("Error al obtener todas las secciones de banner:", error);
      res.status(500).json({ message: "Error al obtener las secciones de banner" });
    }
  };

  /**
   * Obtiene todas las secciones de banner con sus relaciones
   */
  getAllWithRelations = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionBanners = await this.sectionBannerService.getAllWithRelations();
      res.status(200).json(sectionBanners);
    } catch (error) {
      console.error("Error al obtener secciones de banner con relaciones:", error);
      res.status(500).json({ message: "Error al obtener secciones de banner con relaciones" });
    }
  };

  /**
   * Obtiene una sección de banner por su ID
   */
  getSectionBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionBanner = await this.sectionBannerService.getSectionBannerById(id);
      
      if (!sectionBanner) {
        res.status(404).json({ message: "Sección de banner no encontrada" });
        return;
      }
      
      res.status(200).json(sectionBanner);
    } catch (error) {
      console.error(`Error al obtener la sección de banner con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener la sección de banner" });
    }
  };

  /**
   * Obtiene una sección de banner por su ID con relaciones
   */
  getSectionBannerWithRelations = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionBanner = await this.sectionBannerService.getSectionBannerWithRelations(id);
      
      if (!sectionBanner) {
        res.status(404).json({ message: "Sección de banner no encontrada" });
        return;
      }
      
      res.status(200).json(sectionBanner);
    } catch (error) {
      console.error(`Error al obtener la sección de banner con relaciones ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener la sección de banner con relaciones" });
    }
  };

  /**
   * Crea una nueva sección de banner
   */
  createSectionBanner = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionBannerData = req.body;
      const newSectionBanner = await this.sectionBannerService.createSectionBanner(sectionBannerData);
      res.status(201).json(newSectionBanner);
    } catch (error) {
      console.error("Error al crear la sección de banner:", error);
      res.status(500).json({ message: "Error al crear la sección de banner" });
    }
  };

  /**
   * Actualiza una sección de banner existente
   */
  updateSectionBanner = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const sectionBannerData = req.body;
      const updatedSectionBanner = await this.sectionBannerService.updateSectionBanner(id, sectionBannerData);
      
      if (!updatedSectionBanner) {
        res.status(404).json({ message: "Sección de banner no encontrada" });
        return;
      }
      
      res.status(200).json(updatedSectionBanner);
    } catch (error) {
      console.error(`Error al actualizar la sección de banner con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al actualizar la sección de banner" });
    }
  };

  /**
   * Elimina una sección de banner
   */
  deleteSectionBanner = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.sectionBannerService.deleteSectionBanner(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Sección de banner no encontrada" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar la sección de banner con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al eliminar la sección de banner" });
    }
  };

  /**
   * Verifica si existe una sección de banner
   */
  sectionBannerExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const exists = await this.sectionBannerService.sectionBannerExists(id);
      res.status(200).json({ exists });
    } catch (error) {
      console.error(`Error al verificar la existencia de la sección de banner con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al verificar la existencia de la sección de banner" });
    }
  };

  /**
   * Guarda múltiples secciones de banner
   */
  saveManySectionBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionBannersData = req.body;
      const savedSectionBanners = await this.sectionBannerService.saveManySectionBanners(sectionBannersData);
      res.status(201).json(savedSectionBanners);
    } catch (error) {
      console.error("Error al guardar múltiples secciones de banner:", error);
      res.status(500).json({ message: "Error al guardar múltiples secciones de banner" });
    }
  };

  /**
   * Obtiene la cuenta total de secciones de banner
   */
  countSectionBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.sectionBannerService.countSectionBanners();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error al contar las secciones de banner:", error);
      res.status(500).json({ message: "Error al contar las secciones de banner" });
    }
  };
}