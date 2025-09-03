import { Coupons } from "../models/Coupons";
import { CouponsRepository } from "../repositories/CouponsRepository";
import { DeepPartial } from "typeorm";

export class CouponsService {
  private couponsRepository: CouponsRepository;

  constructor() {
    this.couponsRepository = new CouponsRepository();
  }

  /**
   * Obtiene todos los cupones
   */
  async getAllCoupons(): Promise<Coupons[]> {
    return this.couponsRepository.findAll();
  }

  /**
   * Obtiene un cupón por su ID
   */
  async getCouponById(id: number): Promise<Coupons | null> {
    return this.couponsRepository.findById(id);
  }

  /**
   * Obtiene un cupón por su código
   */
  async getCouponByCode(code: string): Promise<Coupons | null> {
    return this.couponsRepository.findByCode(code);
  }

  /**
   * Crea un nuevo cupón
   */
  async createCoupon(couponData: DeepPartial<Coupons>): Promise<Coupons> {
    return this.couponsRepository.create(couponData);
  }

  /**
   * Actualiza un cupón existente
   */
  async updateCoupon(id: number, couponData: DeepPartial<Coupons>): Promise<Coupons | null> {
    return this.couponsRepository.update(id, couponData);
  }

  /**
   * Elimina un cupón
   */
  async deleteCoupon(id: number): Promise<boolean> {
    return this.couponsRepository.delete(id);
  }

  /**
   * Verifica si existe un cupón
   */
  async couponExists(id: number): Promise<boolean> {
    return this.couponsRepository.exists(id);
  }

  /**
   * Guarda múltiples cupones
   */
  async saveManyCoupons(coupons: DeepPartial<Coupons>[]): Promise<Coupons[]> {
    return this.couponsRepository.saveMany(coupons);
  }

  /**
   * Verifica si un cupón es válido
   */
//   async isCouponValid(code: string): Promise<boolean> {
//     const coupon = await this.couponsRepository.findByCode(code);
//     if (!coupon) return false;
    
//     const now = new Date();
//     return coupon.active && 
//            (!coupon.expirationDate || new Date(coupon.expirationDate) > now) &&
//            (coupon.usageLimit === null || coupon.usageCount < coupon.usageLimit);
//   }

  /**
   * Incrementa el contador de uso de un cupón
   */
//   async incrementCouponUsage(code: string): Promise<Coupons | null> {
//     const coupon = await this.couponsRepository.findByCode(code);
//     if (!coupon) return null;
    
//     coupon.usageCount = (coupon.usageCount || 0) + 1;
//     return this.couponsRepository.update(coupon.id, coupon);
//   }

  /**
   * Obtiene la cantidad total de cupones
   */
  async countCoupons(): Promise<number> {
    return this.couponsRepository.count();
  }
}