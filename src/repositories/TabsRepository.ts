import { BaseRepository } from "../util/BaseRepository";
import { Tabs } from "../models/Tabs";

export class TabsRepository extends BaseRepository<Tabs> {
  constructor() {
    super(Tabs);
  }
  
  // Métodos específicos para Tabs
//   async findBySection(sectionId: number): Promise<Tabs[]> {
//     return this.repository.find({
//       where: { sectionId }
//     });
//   }
  
//   async findByOrder(order: number): Promise<Tabs | null> {
//     return this.repository.findOne({
//       where: { order }
//     });
//   }
}