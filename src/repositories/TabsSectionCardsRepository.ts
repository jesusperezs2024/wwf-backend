import { BaseRepository } from "../util/BaseRepository";
import { TabsSectionCards } from "../models/TabsSectionCards";

export class TabsSectionCardsRepository extends BaseRepository<TabsSectionCards> {
  constructor() {
    super(TabsSectionCards);
  }
  
  // Métodos específicos para TabsSectionCards
  async findByTabId(tabId: number): Promise<TabsSectionCards[]> {
    return this.repository.find({
      where: { tabId }
    });
  }
  
//   async findBySectionId(sectionId: number): Promise<TabsSectionCards[]> {
//     return this.repository.find({
//       where: { sectionId }
//     });
//   }
}