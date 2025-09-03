import { Checkout } from "../models/Checkout";
import { CheckoutRepository } from "../repositories/CheckoutRepository";
import { DeepPartial } from "typeorm";

export class CheckoutService {
  private checkoutRepository: CheckoutRepository;

  constructor() {
    this.checkoutRepository = new CheckoutRepository();
  }

  /**
   * Obtiene todos los checkouts
   */
  async getAllCheckouts(): Promise<Checkout[]> {
    return this.checkoutRepository.findAll();
  }

  /**
   * Obtiene todos los checkouts con sus relaciones
   */
  async getAllWithRelations(): Promise<Checkout[]> {
    return this.checkoutRepository.findWithRelations(['linkCheckout', 'payment']);
  }

  /**
   * Obtiene un checkout por su ID
   */
  async getCheckoutById(id: number): Promise<Checkout | null> {
    return this.checkoutRepository.findById(id);
  }

  /**
   * Obtiene un checkout por su ID con relaciones
   */
  async getCheckoutWithRelations(id: number): Promise<Checkout | null> {
    return this.checkoutRepository.findByIdWithRelations(id, ['linkCheckout', 'payment']);
  }

  /**
   * Crea un nuevo checkout
   */
  async createCheckout(checkoutData: DeepPartial<Checkout>): Promise<Checkout> {
    return this.checkoutRepository.create(checkoutData);
  }

  /**
   * Actualiza un checkout existente
   */
  async updateCheckout(id: number, checkoutData: DeepPartial<Checkout>): Promise<Checkout | null> {
    return this.checkoutRepository.update(id, checkoutData);
  }

  /**
   * Elimina un checkout
   */
  async deleteCheckout(id: number): Promise<boolean> {
    return this.checkoutRepository.delete(id);
  }

  /**
   * Verifica si existe un checkout
   */
  async checkoutExists(id: number): Promise<boolean> {
    return this.checkoutRepository.exists(id);
  }

  /**
   * Guarda múltiples checkouts
   */
  async saveManyCheckouts(checkouts: DeepPartial<Checkout>[]): Promise<Checkout[]> {
    return this.checkoutRepository.saveMany(checkouts);
  }

  /**
   * Obtiene checkouts por estado
   */
  async getCheckoutsByStatus(status: string): Promise<Checkout[]> {
    return this.checkoutRepository.findByStatus(status);
  }

  /**
   * Obtiene la cantidad total de checkouts
   */
  async countCheckouts(): Promise<number> {
    return this.checkoutRepository.count();
  }
}