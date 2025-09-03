import { Request, Response } from 'express';
import { CardsService } from '../services/CardsService';
import { DeepPartial } from 'typeorm';
import { Cards } from '../models/Cards';

export class CardsController {
  private cardsService: CardsService;

  constructor() {
    this.cardsService = new CardsService();
  }

  /**
   * Obtiene todas las tarjetas
   */
  getAllCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const cards = withRelations 
        ? await this.cardsService.getAllWithRelations()
        : await this.cardsService.getAllCards();
      
      res.status(200).json(cards);
    } catch (error) {
      console.error('Error al obtener las tarjetas:', error);
      res.status(500).json({ message: 'Error al obtener las tarjetas' });
    }
  };

  /**
   * Obtiene una tarjeta por su ID
   */
  getCardById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const card = withRelations
        ? await this.cardsService.getCardWithRelations(id)
        : await this.cardsService.getCardById(id);

      if (!card) {
        res.status(404).json({ message: 'Tarjeta no encontrada' });
        return;
      }

      res.status(200).json(card);
    } catch (error) {
      console.error('Error al obtener la tarjeta:', error);
      res.status(500).json({ message: 'Error al obtener la tarjeta' });
    }
  };

  /**
   * Obtiene tarjetas por categoría
   */
  getCardsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = Number(req.params.categoryId);
      if (isNaN(categoryId)) {
        res.status(400).json({ message: 'ID de categoría inválido' });
        return;
      }

      const cards = await this.cardsService.getCardsByCategory(categoryId);
      res.status(200).json(cards);
    } catch (error) {
      console.error('Error al obtener las tarjetas por categoría:', error);
      res.status(500).json({ message: 'Error al obtener las tarjetas por categoría' });
    }
  };

  /**
   * Crea una nueva tarjeta
   */
  createCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const cardData: DeepPartial<Cards> = req.body;
      
      const newCard = await this.cardsService.createCard(cardData);
      res.status(201).json(newCard);
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
      res.status(500).json({ message: 'Error al crear la tarjeta' });
    }
  };

  /**
   * Actualiza una tarjeta existente
   */
  updateCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const cardData: DeepPartial<Cards> = req.body;
      
      const exists = await this.cardsService.cardExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Tarjeta no encontrada' });
        return;
      }

      const updatedCard = await this.cardsService.updateCard(id, cardData);
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
      res.status(500).json({ message: 'Error al actualizar la tarjeta' });
    }
  };

  /**
   * Elimina una tarjeta
   */
  deleteCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.cardsService.cardExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Tarjeta no encontrada' });
        return;
      }

      const deleted = await this.cardsService.deleteCard(id);
      if (deleted) {
        res.status(200).json({ message: 'Tarjeta eliminada con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar la tarjeta' });
      }
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
      res.status(500).json({ message: 'Error al eliminar la tarjeta' });
    }
  };

  /**
   * Guarda múltiples tarjetas
   */
  saveManyCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const cardsData: DeepPartial<Cards>[] = req.body;
      
      if (!Array.isArray(cardsData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de tarjetas' });
        return;
      }

      const savedCards = await this.cardsService.saveManyCards(cardsData);
      res.status(201).json(savedCards);
    } catch (error) {
      console.error('Error al guardar múltiples tarjetas:', error);
      res.status(500).json({ message: 'Error al guardar múltiples tarjetas' });
    }
  };

  /**
   * Obtiene la cantidad total de tarjetas
   */
  countCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.cardsService.countCards();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de tarjetas:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de tarjetas' });
    }
  };
}