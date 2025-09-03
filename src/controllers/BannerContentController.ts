import { Request, Response } from 'express';
import { BannerContentService } from '../services/BannerContentService';
import { DeepPartial } from 'typeorm';
import { BannerContent } from '../models/BannerContent';

export class BannerContentController {
  private bannerContentService: BannerContentService;

  constructor() {
    this.bannerContentService = new BannerContentService();
  }

  /**
   * Obtiene todos los contenidos de banner
   */
  getAllBannerContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const bannerContents = withRelations 
        ? await this.bannerContentService.getAllWithRelations()
        : await this.bannerContentService.getAllBannerContents();
      
      res.status(200).json(bannerContents);
    } catch (error) {
      console.error('Error al obtener los contenidos de banner:', error);
      res.status(500).json({ message: 'Error al obtener los contenidos de banner' });
    }
  };

  /**
   * Obtiene un contenido de banner por su ID
   */
  getBannerContentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const bannerContent = withRelations
        ? await this.bannerContentService.getBannerContentWithRelations(id)
        : await this.bannerContentService.getBannerContentById(id);

      if (!bannerContent) {
        res.status(404).json({ message: 'Contenido de banner no encontrado' });
        return;
      }

      res.status(200).json(bannerContent);
    } catch (error) {
      console.error('Error al obtener el contenido de banner:', error);
      res.status(500).json({ message: 'Error al obtener el contenido de banner' });
    }
  };

  /**
   * Obtiene contenidos de banner por ID de banner
   */
  getByBannerId = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = Number(req.params.bannerId);
      if (isNaN(bannerId)) {
        res.status(400).json({ message: 'ID de banner inválido' });
        return;
      }

      const bannerContents = await this.bannerContentService.getByBannerId(bannerId);
      res.status(200).json(bannerContents);
    } catch (error) {
      console.error('Error al obtener los contenidos de banner:', error);
      res.status(500).json({ message: 'Error al obtener los contenidos de banner' });
    }
  };

  /**
   * Obtiene contenidos de banner por ID de tarjeta horizontal
   */
  getByHorizontalCardId = async (req: Request, res: Response): Promise<void> => {
    try {
      const horizontalCardId = Number(req.params.horizontalCardId);
      if (isNaN(horizontalCardId)) {
        res.status(400).json({ message: 'ID de tarjeta horizontal inválido' });
        return;
      }

      const bannerContents = await this.bannerContentService.getByHorizontalCardId(horizontalCardId);
      res.status(200).json(bannerContents);
    } catch (error) {
      console.error('Error al obtener los contenidos de banner:', error);
      res.status(500).json({ message: 'Error al obtener los contenidos de banner' });
    }
  };

  /**
   * Crea un nuevo contenido de banner
   */
  createBannerContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerContentData: DeepPartial<BannerContent> = req.body;
      
      const newBannerContent = await this.bannerContentService.createBannerContent(bannerContentData);
      res.status(201).json(newBannerContent);
    } catch (error) {
      console.error('Error al crear el contenido de banner:', error);
      res.status(500).json({ message: 'Error al crear el contenido de banner' });
    }
  };

  /**
   * Actualiza un contenido de banner existente
   */
  updateBannerContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const bannerContentData: DeepPartial<BannerContent> = req.body;
      
      const exists = await this.bannerContentService.bannerContentExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Contenido de banner no encontrado' });
        return;
      }

      const updatedBannerContent = await this.bannerContentService.updateBannerContent(id, bannerContentData);
      res.status(200).json(updatedBannerContent);
    } catch (error) {
      console.error('Error al actualizar el contenido de banner:', error);
      res.status(500).json({ message: 'Error al actualizar el contenido de banner' });
    }
  };

  /**
   * Elimina un contenido de banner
   */
  deleteBannerContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.bannerContentService.bannerContentExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Contenido de banner no encontrado' });
        return;
      }

      const deleted = await this.bannerContentService.deleteBannerContent(id);
      if (deleted) {
        res.status(200).json({ message: 'Contenido de banner eliminado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar el contenido de banner' });
      }
    } catch (error) {
      console.error('Error al eliminar el contenido de banner:', error);
      res.status(500).json({ message: 'Error al eliminar el contenido de banner' });
    }
  };

  /**
   * Guarda múltiples contenidos de banner
   */
  saveManyBannerContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerContentsData: DeepPartial<BannerContent>[] = req.body;
      
      if (!Array.isArray(bannerContentsData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de contenidos de banner' });
        return;
      }

      const savedBannerContents = await this.bannerContentService.saveManyBannerContents(bannerContentsData);
      res.status(201).json(savedBannerContents);
    } catch (error) {
      console.error('Error al guardar múltiples contenidos de banner:', error);
      res.status(500).json({ message: 'Error al guardar múltiples contenidos de banner' });
    }
  };

  /**
   * Obtiene la cuenta total de contenidos de banner
   */
  countBannerContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.bannerContentService.countBannerContents();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cuenta de contenidos de banner:', error);
      res.status(500).json({ message: 'Error al obtener la cuenta de contenidos de banner' });
    }
  };
}