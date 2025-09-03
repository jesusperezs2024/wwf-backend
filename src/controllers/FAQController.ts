import { Request, Response } from 'express';
import { FAQService } from '../services/FAQService';
import { FAQ } from '../models/FAQ';
import { DeepPartial } from 'typeorm';

export class FAQController {
  private faqService: FAQService;

  constructor() {
    this.faqService = new FAQService();
  }

  /**
   * Obtiene todas las preguntas frecuentes
   */
  async getAllFAQs(req: Request, res: Response): Promise<void> {
    try {
      const faqs = await this.faqService.getAllFAQs();
      res.status(200).json(faqs);
    } catch (error) {
      console.error('Error al obtener FAQs:', error);
      res.status(500).json({ message: 'Error al obtener preguntas frecuentes' });
    }
  }

  /**
   * Obtiene todas las preguntas frecuentes con sus relaciones
   */
  async getAllWithRelations(req: Request, res: Response): Promise<void> {
    try {
      const faqs = await this.faqService.getAllWithRelations();
      res.status(200).json(faqs);
    } catch (error) {
      console.error('Error al obtener FAQs con relaciones:', error);
      res.status(500).json({ message: 'Error al obtener preguntas frecuentes con relaciones' });
    }
  }

  /**
   * Obtiene una pregunta frecuente por su ID
   */
  async getFAQById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const faq = await this.faqService.getFAQById(id);
      if (!faq) {
        res.status(404).json({ message: 'Pregunta frecuente no encontrada' });
        return;
      }

      res.status(200).json(faq);
    } catch (error) {
      console.error(`Error al obtener FAQ con ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Error al obtener pregunta frecuente' });
    }
  }

  /**
   * Crea una nueva pregunta frecuente
   */
  async createFAQ(req: Request, res: Response): Promise<void> {
    try {
      const faqData: DeepPartial<FAQ> = req.body;
      const newFAQ = await this.faqService.createFAQ(faqData);
      res.status(201).json(newFAQ);
    } catch (error) {
      console.error('Error al crear FAQ:', error);
      res.status(500).json({ message: 'Error al crear pregunta frecuente' });
    }
  }

  /**
   * Actualiza una pregunta frecuente existente
   */
  async updateFAQ(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.faqService.faqExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Pregunta frecuente no encontrada' });
        return;
      }

      const faqData: DeepPartial<FAQ> = req.body;
      const updatedFAQ = await this.faqService.updateFAQ(id, faqData);
      res.status(200).json(updatedFAQ);
    } catch (error) {
      console.error(`Error al actualizar FAQ con ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Error al actualizar pregunta frecuente' });
    }
  }

  /**
   * Elimina una pregunta frecuente
   */
  async deleteFAQ(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.faqService.faqExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Pregunta frecuente no encontrada' });
        return;
      }

      const deleted = await this.faqService.deleteFAQ(id);
      if (deleted) {
        res.status(200).json({ message: 'Pregunta frecuente eliminada correctamente' });
      } else {
        res.status(500).json({ message: 'Error al eliminar pregunta frecuente' });
      }
    } catch (error) {
      console.error(`Error al eliminar FAQ con ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Error al eliminar pregunta frecuente' });
    }
  }

  /**
   * Guarda múltiples preguntas frecuentes
   */
  async saveManyFAQs(req: Request, res: Response): Promise<void> {
    try {
      const faqsData: DeepPartial<FAQ>[] = req.body;
      if (!Array.isArray(faqsData)) {
        res.status(400).json({ message: 'Los datos enviados deben ser un array' });
        return;
      }

      const savedFAQs = await this.faqService.saveManyFAQs(faqsData);
      res.status(201).json(savedFAQs);
    } catch (error) {
      console.error('Error al guardar múltiples FAQs:', error);
      res.status(500).json({ message: 'Error al guardar múltiples preguntas frecuentes' });
    }
  }

  /**
   * Busca preguntas frecuentes por palabra clave
   */
  async searchFAQs(req: Request, res: Response): Promise<void> {
    try {
      const keyword = req.query.keyword as string;
      if (!keyword) {
        res.status(400).json({ message: 'Se requiere una palabra clave para la búsqueda' });
        return;
      }

      const faqs = await this.faqService.searchFAQs(keyword);
      res.status(200).json(faqs);
    } catch (error) {
      console.error(`Error al buscar FAQs con palabra clave ${req.query.keyword}:`, error);
      res.status(500).json({ message: 'Error al buscar preguntas frecuentes' });
    }
  }

  /**
   * Obtiene la cantidad total de preguntas frecuentes
   */
  async countFAQs(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.faqService.countFAQs();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al contar FAQs:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de preguntas frecuentes' });
    }
  }
}