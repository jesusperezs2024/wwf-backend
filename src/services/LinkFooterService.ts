import { LinkFooterRepository } from "../repositories/LinkFooterRepository";
import { LinkFooter } from "../models/LinkFooter";
import { DeepPartial } from "typeorm";

export class LinkFooterService {
  private linkFooterRepository: LinkFooterRepository;

  constructor() {
    this.linkFooterRepository = new LinkFooterRepository();
  }

  async getAllLinkFooters(): Promise<LinkFooter[]> {
    return this.linkFooterRepository.findAll();
  }

  async getLinkFooterById(id: number): Promise<LinkFooter | null> {
    return this.linkFooterRepository.findById(id);
  }

  async createLinkFooter(linkFooterData: DeepPartial<LinkFooter>): Promise<LinkFooter> {
    return this.linkFooterRepository.create(linkFooterData);
  }

  async updateLinkFooter(id: number, linkFooterData: DeepPartial<LinkFooter>): Promise<LinkFooter | null> {
    return this.linkFooterRepository.update(id, linkFooterData);
  }

  async deleteLinkFooter(id: number): Promise<boolean> {
    return this.linkFooterRepository.delete(id);
  }

//   async getLinkFootersByCategory(category: string): Promise<LinkFooter[]> {
//     return this.linkFooterRepository.findOne({
//       where: { category }
//     });
//   }

//   async getActiveLinkFooters(): Promise<LinkFooter[]> {
//     return this.linkFooterRepository.findOne({
//       where: { active: true }
//     });
//   }

  async getLinkFootersWithRelations(relations: string[]): Promise<LinkFooter[]> {
    return this.linkFooterRepository.findWithRelations(relations);
  }
}