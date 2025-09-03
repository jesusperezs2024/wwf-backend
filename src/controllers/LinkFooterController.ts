import { Request, Response } from "express";
import { LinkFooterService } from "../services/LinkFooterService";
import { LinkFooter } from "../models/LinkFooter";

export class LinkFooterController {
  private linkFooterService: LinkFooterService;

  constructor() {
    this.linkFooterService = new LinkFooterService();
  }

  getAllLinkFooters = async (req: Request, res: Response): Promise<void> => {
    try {
      const linkFooters = await this.linkFooterService.getAllLinkFooters();
      res.status(200).json(linkFooters);
    } catch (error) {
      console.error("Error fetching all link footers:", error);
      res.status(500).json({ message: "Error fetching link footers" });
    }
  };

  getLinkFooterById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const linkFooter = await this.linkFooterService.getLinkFooterById(id);
      
      if (!linkFooter) {
        res.status(404).json({ message: "Link footer not found" });
        return;
      }
      
      res.status(200).json(linkFooter);
    } catch (error) {
      console.error(`Error fetching link footer with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error fetching link footer" });
    }
  };

  createLinkFooter = async (req: Request, res: Response): Promise<void> => {
    try {
      const linkFooterData = req.body;
      const newLinkFooter = await this.linkFooterService.createLinkFooter(linkFooterData);
      res.status(201).json(newLinkFooter);
    } catch (error) {
      console.error("Error creating link footer:", error);
      res.status(500).json({ message: "Error creating link footer" });
    }
  };

  updateLinkFooter = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const linkFooterData = req.body;
      const updatedLinkFooter = await this.linkFooterService.updateLinkFooter(id, linkFooterData);
      
      if (!updatedLinkFooter) {
        res.status(404).json({ message: "Link footer not found" });
        return;
      }
      
      res.status(200).json(updatedLinkFooter);
    } catch (error) {
      console.error(`Error updating link footer with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating link footer" });
    }
  };

  deleteLinkFooter = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.linkFooterService.deleteLinkFooter(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Link footer not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting link footer with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting link footer" });
    }
  };

//   getLinkFootersByCategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const category = req.params.category;
//       const linkFooters = await this.linkFooterService.getLinkFootersByCategory(category);
//       res.status(200).json(linkFooters);
//     } catch (error) {
//       console.error(`Error fetching link footers by category ${req.params.category}:`, error);
//       res.status(500).json({ message: "Error fetching link footers by category" });
//     }
//   };

//   getActiveLinkFooters = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const activeLinkFooters = await this.linkFooterService.getActiveLinkFooters();
//       res.status(200).json(activeLinkFooters);
//     } catch (error) {
//       console.error("Error fetching active link footers:", error);
//       res.status(500).json({ message: "Error fetching active link footers" });
//     }
//   };
}