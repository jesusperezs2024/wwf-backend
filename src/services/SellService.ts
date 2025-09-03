import { Sell } from "../models/Sell";
import { SellRepository } from "../repositories/SellRepository";
import { DeepPartial } from "typeorm";

export class SellService {
  private sellRepository: SellRepository;

  constructor() {
    this.sellRepository = new SellRepository();
  }

  /**
   * Obtiene todas las ventas
   */
  async getAllSells(): Promise<Sell[]> {
    return this.sellRepository.findAll();
  }

  /**
   * Obtiene todas las ventas con sus relaciones
   */
  async getAllWithRelations(): Promise<Sell[]> {
    return this.sellRepository.findWithRelations(['products', 'customer']);
  }

  /**
   * Obtiene una venta por su ID
   */
  async getSellById(id: number): Promise<Sell | null> {
    return this.sellRepository.findById(id);
  }

  /**
   * Obtiene una venta por su ID con relaciones
   */
  async getSellWithRelations(id: number): Promise<Sell | null> {
    return this.sellRepository.findByIdWithRelations(id, ['products', 'customer']);
  }

  /**
   * Crea una nueva venta
   */
  async createSell(sellData: DeepPartial<Sell>): Promise<Sell> {
    return this.sellRepository.create(sellData);
  }

  /**
   * Actualiza una venta existente
   */
//   async updateSell(id: number, sellData: DeepPartial<Sell>): Promise<Sell> {
//     return this.sellRepository.update(id, sellData);
//   }

  /**
   * Elimina una venta
   */
  async deleteSell(id: number): Promise<void> {
    await this.sellRepository.delete(id);
  }
  
  /**
   * Obtiene ventas por cliente
   */
//   async getSellsByCustomer(customerId: number): Promise<Sell[]> {
//     return this.sellRepository.findByCustomer(customerId);
//   }
  
//   /**
//    * Obtiene el total de ventas por periodo
//    */
//   async getSellsTotalByPeriod(startDate: Date, endDate: Date): Promise<number> {
//     return this.sellRepository.calculateTotalByPeriod(startDate, endDate);
//   }
}