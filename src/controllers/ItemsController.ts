import { Request, Response } from "express";
import { ItemsService } from "../services/ItemsService";

export class ItemsController {
  private itemsService: ItemsService;

  constructor() {
    this.itemsService = new ItemsService();
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const items = await this.itemsService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo los items" });
    }
  }

  async getAllWithRelations(req: Request, res: Response) {
    try {
      const items = await this.itemsService.getAllWithRelations();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo los items con relaciones" });
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await this.itemsService.getItemById(Number(id));
      if (!item) {
        return res.status(404).json({ error: "Item no encontrado" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo el item" });
    }
  }

  async getItemWithRelations(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await this.itemsService.getItemWithRelations(Number(id));
      if (!item) {
        return res.status(404).json({ error: "Item no encontrado" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo el item con relaciones" });
    }
  }

  async createItem(req: Request, res: Response) {
    try {
      const itemData = req.body;
      const newItem = await this.itemsService.createItem(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Error creando el item" });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const itemData = req.body;
      const updatedItem = await this.itemsService.updateItem(Number(id), itemData);
      if (!updatedItem) {
        return res.status(404).json({ error: "Item no encontrado" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el item" });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.itemsService.deleteItem(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: "Item no encontrado" });
      }
      res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el item" });
    }
  }

  async countItems(req: Request, res: Response) {
    try {
      const count = await this.itemsService.countItems();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo la cantidad de items" });
    }
  }
}
