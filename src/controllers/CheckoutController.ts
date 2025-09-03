import { Request, Response } from 'express';
import { CheckoutService } from '../services/CheckoutService';
import { DeepPartial } from 'typeorm';
import { Checkout } from '../models/Checkout';

export class CheckoutController {
  private checkoutService: CheckoutService;

  constructor() {
    this.checkoutService = new CheckoutService();
  }

  /**
   * Obtiene todos los checkouts
   */
  getAllCheckouts = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const checkouts = withRelations 
        ? await this.checkoutService.getAllWithRelations()
        : await this.checkoutService.getAllCheckouts();
      
      res.status(200).json(checkouts);
    } catch (error) {
      console.error('Error al obtener los checkouts:', error);
      res.status(500).json({ message: 'Error al obtener los checkouts' });
    }
  };

  /**
   * Obtiene un checkout por su ID
   */
  getCheckoutById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const checkout = withRelations
        ? await this.checkoutService.getCheckoutWithRelations(id)
        : await this.checkoutService.getCheckoutById(id);

      if (!checkout) {
        res.status(404).json({ message: 'Checkout no encontrado' });
        return;
      }

      res.status(200).json(checkout);
    } catch (error) {
      console.error('Error al obtener el checkout:', error);
      res.status(500).json({ message: 'Error al obtener el checkout' });
    }
  };

  /**
   * Obtiene checkouts por estado
   */
  getCheckoutsByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const status = req.params.status || req.query.status as string;
      
      if (!status) {
        res.status(400).json({ message: 'El estado es requerido' });
        return;
      }

      const checkouts = await this.checkoutService.getCheckoutsByStatus(status);
      res.status(200).json(checkouts);
    } catch (error) {
      console.error('Error al obtener los checkouts por estado:', error);
      res.status(500).json({ message: 'Error al obtener los checkouts por estado' });
    }
  };

  /**
   * Crea un nuevo checkout
   */
  createCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
      const checkoutData: DeepPartial<Checkout> = req.body;
      
      const newCheckout = await this.checkoutService.createCheckout(checkoutData);
      res.status(201).json(newCheckout);
    } catch (error) {
      console.error('Error al crear el checkout:', error);
      res.status(500).json({ message: 'Error al crear el checkout' });
    }
  };

  /**
   * Actualiza un checkout existente
   */
  updateCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const checkoutData: DeepPartial<Checkout> = req.body;
      
      const exists = await this.checkoutService.checkoutExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Checkout no encontrado' });
        return;
      }

      const updatedCheckout = await this.checkoutService.updateCheckout(id, checkoutData);
      res.status(200).json(updatedCheckout);
    } catch (error) {
      console.error('Error al actualizar el checkout:', error);
      res.status(500).json({ message: 'Error al actualizar el checkout' });
    }
  };

  /**
   * Elimina un checkout
   */
  deleteCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.checkoutService.checkoutExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Checkout no encontrado' });
        return;
      }

      const deleted = await this.checkoutService.deleteCheckout(id);
      if (deleted) {
        res.status(200).json({ message: 'Checkout eliminado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar el checkout' });
      }
    } catch (error) {
      console.error('Error al eliminar el checkout:', error);
      res.status(500).json({ message: 'Error al eliminar el checkout' });
    }
  };

  /**
   * Guarda múltiples checkouts
   */
  saveManyCheckouts = async (req: Request, res: Response): Promise<void> => {
    try {
      const checkoutsData: DeepPartial<Checkout>[] = req.body;
      
      if (!Array.isArray(checkoutsData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de checkouts' });
        return;
      }

      const savedCheckouts = await this.checkoutService.saveManyCheckouts(checkoutsData);
      res.status(201).json(savedCheckouts);
    } catch (error) {
      console.error('Error al guardar múltiples checkouts:', error);
      res.status(500).json({ message: 'Error al guardar múltiples checkouts' });
    }
  };

  /**
   * Obtiene la cantidad total de checkouts
   */
  countCheckouts = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.checkoutService.countCheckouts();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de checkouts:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de checkouts' });
    }
  };
}