import { TabsCards } from "../models/TabsCards";
import { TabsCardsRepository } from "../repositories/TabsCardsRepository";
import { DeepPartial } from "typeorm";

export class TabsCardsService {
  private tabsCardsRepository: TabsCardsRepository;

  constructor() {
    this.tabsCardsRepository = new TabsCardsRepository();
  }

  /**
   * Obtiene todos los tabs con tarjetas
   */
  async getAllTabsCards(): Promise<TabsCards[]> {
    return this.tabsCardsRepository.findAll();
  }

  /**
   * Obtiene todos los tabs con tarjetas con sus relaciones
   */
  async getAllWithRelations(): Promise<TabsCards[]> {
    return this.tabsCardsRepository.findWithRelations(['tabs', 'cards']);
  }

  /**
   * Obtiene un tab con tarjetas por su ID
   */
  async getTabsCardsById(id: number): Promise<TabsCards | null> {
    return this.tabsCardsRepository.findById(id);
  }

  /**
   * Obtiene un tab con tarjetas por su ID con relaciones
   */
  async getTabsCardsWithRelations(id: number): Promise<TabsCards | null> {
    return this.tabsCardsRepository.findByIdWithRelations(id, ['tabs', 'cards']);
  }

  /**
   * Crea un nuevo tab con tarjetas
   */
  async createTabsCards(tabsCardsData: DeepPartial<TabsCards>): Promise<TabsCards> {
    return this.tabsCardsRepository.create(tabsCardsData);
  }

  /**
   * Actualiza un tab con tarjetas existente
   */
//   async updateTabsCards(id: number, tabsCardsData: DeepPartial<TabsCards>): Promise<TabsCards> {
//     return this.tabsCardsRepository.update(id, tabsCardsData);
//   }

  /**
   * Elimina un tab con tarjetas
   */
  async deleteTabsCards(id: number): Promise<void> {
    await this.tabsCardsRepository.delete(id);
  }
}