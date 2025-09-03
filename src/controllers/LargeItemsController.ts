import { Request, Response } from "express";
import { LargeItemsService } from "../services/LargeItemsService";

export class LargeItemsController {
  private largeItemsService: LargeItemsService;

  constructor() {
    this.largeItemsService = new LargeItemsService();
  }

  async getAllLargeItems(req: Request, res: Response) {
    try {
      const items = await this.largeItemsService.getAllLargeItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo los items grandes" });
    }
  }

  async getAllWithRelations(req: Request, res: Response) {
    try {
      const items = await this.largeItemsService.getAllWithRelations();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo los items grandes con relaciones" });
    }
  }

  async getLargeItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await this.largeItemsService.getLargeItemById(Number(id));
      if (!item) {
        return res.status(404).json({ error: "Item grande no encontrado" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo el item grande" });
    }
  }

  async getLargeItemWithRelations(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await this.largeItemsService.getLargeItemWithRelations(Number(id));
      if (!item) {
        return res.status(404).json({ error: "Item grande no encontrado" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo el item grande con relaciones" });
    }
  }

  async createLargeItem(req: Request, res: Response) {
    try {
      const itemData = req.body;
      const newItem = await this.largeItemsService.createLargeItem(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Error creando el item grande" });
    }
  }

  async updateLargeItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const itemData = req.body;
      const updatedItem = await this.largeItemsService.updateLargeItem(Number(id), itemData);
      if (!updatedItem) {
        return res.status(404).json({ error: "Item grande no encontrado" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el item grande" });
    }
  }

  async deleteLargeItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.largeItemsService.deleteLargeItem(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: "Item grande no encontrado" });
      }
      res.json({ message: "Item grande eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el item grande" });
    }
  }

  async countLargeItems(req: Request, res: Response) {
    try {
      const count = await this.largeItemsService.countLargeItems();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo la cantidad de items grandes" });
    }
  }
}