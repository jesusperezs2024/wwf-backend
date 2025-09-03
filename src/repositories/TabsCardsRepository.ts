import { BaseRepository } from "../util/BaseRepository";
import { TabsCards } from "../models/TabsCards";

export class TabsCardsRepository extends BaseRepository<TabsCards> {
  constructor() {
    super(TabsCards);
  }
  
  // Métodos específicos para TabsCards
//   async findByTabId(tabId: number): Promise<TabsCards[]> {
//     return this.repository.find({
//       where: { tabId }
//     });
//   }
  
//   async findByCardId(cardId: number): Promise<TabsCards[]> {
//     return this.repository.find({
//       where: { cardId }
//     });
//   }
}