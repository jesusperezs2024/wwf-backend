import { Cards } from "../models/Cards";
import { CardsRepository } from "../repositories/CardsRepository";
import { DeepPartial } from "typeorm";

export class CardsService {
  private cardsRepository: CardsRepository;

  constructor() {
    this.cardsRepository = new CardsRepository();
  }

  /**
   * Obtiene todas las tarjetas
   */
  async getAllCards(): Promise<Cards[]> {
    return this.cardsRepository.findAll();
  }

  /**
   * Obtiene todas las tarjetas con sus relaciones
   */
  async getAllWithRelations(): Promise<Cards[]> {
    return this.cardsRepository.findWithRelations(['category']);
  }

  /**
   * Obtiene una tarjeta por su ID
   */
  async getCardById(id: number): Promise<Cards | null> {
    return this.cardsRepository.findById(id);
  }

  /**
   * Obtiene una tarjeta por su ID con relaciones
   */
  async getCardWithRelations(id: number): Promise<Cards | null> {
    return this.cardsRepository.findByIdWithRelations(id, ['category']);
  }

  /**
   * Crea una nueva tarjeta
   */
  async createCard(cardData: DeepPartial<Cards>): Promise<Cards> {
    return this.cardsRepository.create(cardData);
  }

  /**
   * Actualiza una tarjeta existente
   */
  async updateCard(id: number, cardData: DeepPartial<Cards>): Promise<Cards | null> {
    return this.cardsRepository.update(id, cardData);
  }

  /**
   * Elimina una tarjeta
   */
  async deleteCard(id: number): Promise<boolean> {
    return this.cardsRepository.delete(id);
  }

  /**
   * Verifica si existe una tarjeta
   */
  async cardExists(id: number): Promise<boolean> {
    return this.cardsRepository.exists(id);
  }

  /**
   * Guarda múltiples tarjetas
   */
  async saveManyCards(cards: DeepPartial<Cards>[]): Promise<Cards[]> {
    return this.cardsRepository.saveMany(cards);
  }

  /**
   * Obtiene tarjetas por categoría
   */
  async getCardsByCategory(categoryId: number): Promise<Cards[]> {
    return this.cardsRepository.findByCategory(categoryId);
  }

  /**
   * Obtiene la cantidad total de tarjetas
   */
  async countCards(): Promise<number> {
    return this.cardsRepository.count();
  }
}