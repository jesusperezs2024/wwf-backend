import { Tabs } from "../models/Tabs";
import { TabsRepository } from "../repositories/TabsRepository";
import { DeepPartial } from "typeorm";

export class TabsService {
  private tabsRepository: TabsRepository;

  constructor() {
    this.tabsRepository = new TabsRepository();
  }

  /**
   * Obtiene todos los tabs
   */
  async getAllTabs(): Promise<Tabs[]> {
    return this.tabsRepository.findAll();
  }

  /**
   * Obtiene todos los tabs con sus relaciones
   */
  async getAllWithRelations(): Promise<Tabs[]> {
    return this.tabsRepository.findWithRelations(['tabItems']);
  }

  /**
   * Obtiene un tab por su ID
   */
  async getTabsById(id: number): Promise<Tabs | null> {
    return this.tabsRepository.findById(id);
  }

  /**
   * Obtiene un tab por su ID con relaciones
   */
  async getTabsWithRelations(id: number): Promise<Tabs | null> {
    return this.tabsRepository.findByIdWithRelations(id, ['tabItems']);
  }

  /**
   * Crea un nuevo tab
   */
  async createTabs(tabsData: DeepPartial<Tabs>): Promise<Tabs> {
    return this.tabsRepository.create(tabsData);
  }

  /**
   * Actualiza un tab existente
   */
//   async updateTabs(id: number, tabsData: DeepPartial<Tabs>): Promise<Tabs> {
//     return this.tabsRepository.update(id, tabsData);
//   }

  /**
   * Elimina un tab
   */
  async deleteTabs(id: number): Promise<void> {
    await this.tabsRepository.delete(id);
  }
}