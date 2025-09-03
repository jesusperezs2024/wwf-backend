import { Request, Response } from "express";
import { LinkCheckoutService } from "../services/LinkCheckoutService";

export class LinkCheckoutController {
  private linkCheckoutService: LinkCheckoutService;

  constructor() {
    this.linkCheckoutService = new LinkCheckoutService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const linkCheckouts = await this.linkCheckoutService.getAllLinkCheckouts();
      res.json(linkCheckouts);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los enlaces de checkout" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const linkCheckout = await this.linkCheckoutService.getLinkCheckoutById(Number(id));
      if (!linkCheckout) {
        return res.status(404).json({ error: "Enlace de checkout no encontrado" });
      }
      res.json(linkCheckout);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el enlace de checkout" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newLinkCheckout = await this.linkCheckoutService.createLinkCheckout(req.body);
      res.status(201).json(newLinkCheckout);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el enlace de checkout" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedLinkCheckout = await this.linkCheckoutService.updateLinkCheckout(Number(id), req.body);
      if (!updatedLinkCheckout) {
        return res.status(404).json({ error: "Enlace de checkout no encontrado" });
      }
      res.json(updatedLinkCheckout);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el enlace de checkout" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.linkCheckoutService.deleteLinkCheckout(Number(id));
      if (!success) {
        return res.status(404).json({ error: "Enlace de checkout no encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el enlace de checkout" });
    }
  }
}
