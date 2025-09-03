import { TabsSectionCards } from "../models/TabsSectionCards";
import { TabsSectionCardsRepository } from "../repositories/TabsSectionCardsRepository";
import { DeepPartial } from "typeorm";

export class TabsSectionCardsService {
  private tabsSectionCardsRepository: TabsSectionCardsRepository;

  constructor() {
    this.tabsSectionCardsRepository = new TabsSectionCardsRepository();
  }

  /**
   * Obtiene todas las secciones de tabs con tarjetas
   */
  async getAllTabsSectionCards(): Promise<TabsSectionCards[]> {
    return this.tabsSectionCardsRepository.findAll();
  }

  /**
   * Obtiene todas las secciones de tabs con tarjetas con sus relaciones
   */
  async getAllWithRelations(): Promise<TabsSectionCards[]> {
    return this.tabsSectionCardsRepository.findWithRelations(['tabs', 'sectionCards']);
  }

  /**
   * Obtiene una sección de tabs con tarjetas por su ID
   */
  async getTabsSectionCardsById(id: number): Promise<TabsSectionCards | null> {
    return this.tabsSectionCardsRepository.findById(id);
  }

  /**
   * Obtiene una sección de tabs con tarjetas por su ID con relaciones
   */
  async getTabsSectionCardsWithRelations(id: number): Promise<TabsSectionCards | null> {
    return this.tabsSectionCardsRepository.findByIdWithRelations(id, ['tabs', 'sectionCards']);
  }

  /**
   * Crea una nueva sección de tabs con tarjetas
   */
  async createTabsSectionCards(tabsSectionCardsData: DeepPartial<TabsSectionCards>): Promise<TabsSectionCards> {
    return this.tabsSectionCardsRepository.create(tabsSectionCardsData);
  }

  /**
   * Actualiza una sección de tabs con tarjetas existente
   */
//   async updateTabsSectionCards(id: number, tabsSectionCardsData: DeepPartial<TabsSectionCards>): Promise<TabsSectionCards> {
//     return this.tabsSectionCardsRepository.update(id, tabsSectionCardsData);
//   }

  /**
   * Elimina una sección de tabs con tarjetas
   */
  async deleteTabsSectionCards(id: number): Promise<void> {
    await this.tabsSectionCardsRepository.delete(id);
  }
}