import { Request, Response, NextFunction, RequestHandler } from "express";
import { HorizontalCardService } from "../services/HorizontalCardService";

export class HorizontalCardController {
  private horizontalCardService: HorizontalCardService;

  constructor() {
    this.horizontalCardService = new HorizontalCardService();
  }

  // Definir cada método como una propiedad que retorna un RequestHandler
  getAllHorizontalCards: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cards = await this.horizontalCardService.getAllHorizontalCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo las tarjetas horizontales" });
    }
  };

  getAllWithRelations: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cards = await this.horizontalCardService.getAllWithRelations();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo las tarjetas con relaciones" });
    }
  };

  getHorizontalCardById: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card = await this.horizontalCardService.getHorizontalCardById(Number(id));
      if (!card) {
        res.status(404).json({ error: "Tarjeta no encontrada" });
        return;
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo la tarjeta horizontal" });
    }
  };

  getHorizontalCardWithRelations: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const card = await this.horizontalCardService.getHorizontalCardWithRelations(Number(id));
      if (!card) {
        res.status(404).json({ error: "Tarjeta no encontrada" });
        return;
      }
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo la tarjeta con relaciones" });
    }
  };

  createHorizontalCard: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardData = req.body;
      const newCard = await this.horizontalCardService.createHorizontalCard(cardData);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: "Error creando la tarjeta horizontal" });
    }
  };

  updateHorizontalCard: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const cardData = req.body;
      const updatedCard = await this.horizontalCardService.updateHorizontalCard(Number(id), cardData);
      if (!updatedCard) {
        res.status(404).json({ error: "Tarjeta no encontrada" });
        return;
      }
      res.json(updatedCard);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando la tarjeta horizontal" });
    }
  };

  deleteHorizontalCard: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.horizontalCardService.deleteHorizontalCard(Number(id));
      if (!deleted) {
        res.status(404).json({ error: "Tarjeta no encontrada" });
        return;
      }
      res.json({ message: "Tarjeta eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la tarjeta horizontal" });
    }
  };

  countHorizontalCards: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count = await this.horizontalCardService.countHorizontalCards();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo la cantidad de tarjetas" });
    }
  };
}