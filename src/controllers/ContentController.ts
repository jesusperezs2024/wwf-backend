import { Request, Response } from 'express';
import { ContentService } from '../services/ContentService';
import { DeepPartial } from 'typeorm';
import { Content } from '../models/Content';

export class ContentController {
  private contentService: ContentService;

  constructor() {
    this.contentService = new ContentService();
  }

  /**
   * Obtiene todos los contenidos
   */
  getAllContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const contents = withRelations 
        ? await this.contentService.getAllWithRelations()
        : await this.contentService.getAllContents();
      
      res.status(200).json(contents);
    } catch (error) {
      console.error('Error al obtener los contenidos:', error);
      res.status(500).json({ message: 'Error al obtener los contenidos' });
    }
  };

  /**
   * Obtiene un contenido por su ID
   */
  getContentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const content = withRelations
        ? await this.contentService.getContentWithRelations(id)
        : await this.contentService.getContentById(id);

      if (!content) {
        res.status(404).json({ message: 'Contenido no encontrado' });
        return;
      }

      res.status(200).json(content);
    } catch (error) {
      console.error('Error al obtener el contenido:', error);
      res.status(500).json({ message: 'Error al obtener el contenido' });
    }
  };

  /**
   * Crea un nuevo contenido
   */
  createContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const contentData: DeepPartial<Content> = req.body;
      
      const newContent = await this.contentService.createContent(contentData);
      res.status(201).json(newContent);
    } catch (error) {
      console.error('Error al crear el contenido:', error);
      res.status(500).json({ message: 'Error al crear el contenido' });
    }
  };

  /**
   * Actualiza un contenido existente
   */
  updateContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const contentData: DeepPartial<Content> = req.body;
      
      const exists = await this.contentService.contentExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Contenido no encontrado' });
        return;
      }

      const updatedContent = await this.contentService.updateContent(id, contentData);
      res.status(200).json(updatedContent);
    } catch (error) {
      console.error('Error al actualizar el contenido:', error);
      res.status(500).json({ message: 'Error al actualizar el contenido' });
    }
  };

  /**
   * Elimina un contenido
   */
  deleteContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.contentService.contentExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Contenido no encontrado' });
        return;
      }

      const deleted = await this.contentService.deleteContent(id);
      if (deleted) {
        res.status(200).json({ message: 'Contenido eliminado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar el contenido' });
      }
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
      res.status(500).json({ message: 'Error al eliminar el contenido' });
    }
  };

  /**
   * Guarda múltiples contenidos
   */
  saveManyContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const contentsData: DeepPartial<Content>[] = req.body;
      
      if (!Array.isArray(contentsData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de contenidos' });
        return;
      }

      const savedContents = await this.contentService.saveManyContents(contentsData);
      res.status(201).json(savedContents);
    } catch (error) {
      console.error('Error al guardar múltiples contenidos:', error);
      res.status(500).json({ message: 'Error al guardar múltiples contenidos' });
    }
  };

  /**
   * Obtiene la cantidad total de contenidos
   */
  countContents = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.contentService.countContents();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de contenidos:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de contenidos' });
    }
  };

  /*  
  /**
   * Obtiene contenidos por tipo
   */
  /*
  getContentsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const type = req.params.type || req.query.type as string;
      
      if (!type) {
        res.status(400).json({ message: 'El tipo es requerido' });
        return;
      }

      const contents = await this.contentService.getContentsByType(type);
      res.status(200).json(contents);
    } catch (error) {
      console.error('Error al obtener los contenidos por tipo:', error);
      res.status(500).json({ message: 'Error al obtener los contenidos por tipo' });
    }
  };
  */
}