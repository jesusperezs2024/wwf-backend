import { BaseRepository } from "../util/BaseRepository";
import { LinkFooter } from "../models/LinkFooter";

export class LinkFooterRepository extends BaseRepository<LinkFooter> {
  constructor() {
    super(LinkFooter);
  }
  
//   async findByCategory(category: string): Promise<LinkFooter[]> {
//     return this.repository.find({
//       where: { category }
//     });
//   }
  
//   async findActive(): Promise<LinkFooter[]> {
//     return this.repository.find({
//       where: { active: true }
//     });
//   }
}