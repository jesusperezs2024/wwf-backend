import { Request, Response } from 'express';
import { CouponsService } from '../services/CouponsService';
import { DeepPartial } from 'typeorm';
import { Coupons } from '../models/Coupons';

export class CouponsController {
  private couponsService: CouponsService;

  constructor() {
    this.couponsService = new CouponsService();
  }

  /**
   * Obtiene todos los cupones
   */
  getAllCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
      const coupons = await this.couponsService.getAllCoupons();
      res.status(200).json(coupons);
    } catch (error) {
      console.error('Error al obtener los cupones:', error);
      res.status(500).json({ message: 'Error al obtener los cupones' });
    }
  };

  /**
   * Obtiene un cupón por su ID
   */
  getCouponById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const coupon = await this.couponsService.getCouponById(id);

      if (!coupon) {
        res.status(404).json({ message: 'Cupón no encontrado' });
        return;
      }

      res.status(200).json(coupon);
    } catch (error) {
      console.error('Error al obtener el cupón:', error);
      res.status(500).json({ message: 'Error al obtener el cupón' });
    }
  };

  /**
   * Obtiene un cupón por su código
   */
  getCouponByCode = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.params.code || req.query.code as string;
      
      if (!code) {
        res.status(400).json({ message: 'El código del cupón es requerido' });
        return;
      }

      const coupon = await this.couponsService.getCouponByCode(code);
      
      if (!coupon) {
        res.status(404).json({ message: 'Cupón no encontrado' });
        return;
      }

      res.status(200).json(coupon);
    } catch (error) {
      console.error('Error al obtener el cupón por código:', error);
      res.status(500).json({ message: 'Error al obtener el cupón por código' });
    }
  };

  /**
   * Crea un nuevo cupón
   */
  createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponData: DeepPartial<Coupons> = req.body;
      
      const newCoupon = await this.couponsService.createCoupon(couponData);
      res.status(201).json(newCoupon);
    } catch (error) {
      console.error('Error al crear el cupón:', error);
      res.status(500).json({ message: 'Error al crear el cupón' });
    }
  };

  /**
   * Actualiza un cupón existente
   */
  updateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const couponData: DeepPartial<Coupons> = req.body;
      
      const exists = await this.couponsService.couponExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Cupón no encontrado' });
        return;
      }

      const updatedCoupon = await this.couponsService.updateCoupon(id, couponData);
      res.status(200).json(updatedCoupon);
    } catch (error) {
      console.error('Error al actualizar el cupón:', error);
      res.status(500).json({ message: 'Error al actualizar el cupón' });
    }
  };

  /**
   * Elimina un cupón
   */
  deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.couponsService.couponExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Cupón no encontrado' });
        return;
      }

      const deleted = await this.couponsService.deleteCoupon(id);
      if (deleted) {
        res.status(200).json({ message: 'Cupón eliminado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar el cupón' });
      }
    } catch (error) {
      console.error('Error al eliminar el cupón:', error);
      res.status(500).json({ message: 'Error al eliminar el cupón' });
    }
  };

  /**
   * Guarda múltiples cupones
   */
  saveManyCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
      const couponsData: DeepPartial<Coupons>[] = req.body;
      
      if (!Array.isArray(couponsData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de cupones' });
        return;
      }

      const savedCoupons = await this.couponsService.saveManyCoupons(couponsData);
      res.status(201).json(savedCoupons);
    } catch (error) {
      console.error('Error al guardar múltiples cupones:', error);
      res.status(500).json({ message: 'Error al guardar múltiples cupones' });
    }
  };

  /**
   * Obtiene la cantidad total de cupones
   */
  countCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.couponsService.countCoupons();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de cupones:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de cupones' });
    }
  };

  /* Nota: Estos métodos están comentados porque también lo están en el servicio
  /**
   * Verifica si un cupón es válido
   */
  /*
  validateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.params.code || req.query.code as string;
      
      if (!code) {
        res.status(400).json({ message: 'El código del cupón es requerido' });
        return;
      }

      const isValid = await this.couponsService.isCouponValid(code);
      res.status(200).json({ isValid });
    } catch (error) {
      console.error('Error al validar el cupón:', error);
      res.status(500).json({ message: 'Error al validar el cupón' });
    }
  };

  /**
   * Incrementa el contador de uso de un cupón
   */
  /*
  incrementCouponUsage = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = req.params.code || req.body.code;
      
      if (!code) {
        res.status(400).json({ message: 'El código del cupón es requerido' });
        return;
      }

      const updatedCoupon = await this.couponsService.incrementCouponUsage(code);
      
      if (!updatedCoupon) {
        res.status(404).json({ message: 'Cupón no encontrado' });
        return;
      }

      res.status(200).json(updatedCoupon);
    } catch (error) {
      console.error('Error al incrementar el uso del cupón:', error);
      res.status(500).json({ message: 'Error al incrementar el uso del cupón' });
    }
  };
  */
}