import { Request, Response } from 'express';
import { SpeciesService } from '../services/SpeciesService';
import { DeepPartial } from 'typeorm';
import { Species } from '../models/Species';

export class SpeciesController {
  private speciesService: SpeciesService;

  constructor() {
    this.speciesService = new SpeciesService();
  }

  /**
   * Obtiene todas las especies
   */
  getAllSpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const withRelations = req.query.withRelations === 'true';
      const species = withRelations 
        ? await this.speciesService.getAllWithRelations()
        : await this.speciesService.getAllSpecies();
      
      res.status(200).json(species);
    } catch (error) {
      console.error('Error al obtener las especies:', error);
      res.status(500).json({ message: 'Error al obtener las especies' });
    }
  };

  /**
   * Obtiene una especie por su ID
   */
  getSpeciesById = async (req: Request, res: Response): Promise<void> => {
    try { 
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const withRelations = req.query.withRelations === 'true';
      const species = withRelations
        ? await this.speciesService.getSpeciesWithRelations(id)
        : await this.speciesService.getSpeciesById(id);

      if (!species) {
        res.status(404).json({ message: 'Especie no encontrada' });
        return;
      }

      res.status(200).json(species);
    } catch (error) {
      console.error('Error al obtener la especie:', error);
      res.status(500).json({ message: 'Error al obtener la especie' });
    }
  };

  /**
   * Obtiene especies por nombre
   */
  getSpeciesByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name || req.query.name as string;
      
      if (!name) {
        res.status(400).json({ message: 'El nombre es requerido' });
        return;
      }

      const species = await this.speciesService.getSpeciesByName(name);
      res.status(200).json(species);
    } catch (error) {
      console.error('Error al obtener las especies por nombre:', error);
      res.status(500).json({ message: 'Error al obtener las especies por nombre' });
    }
  };

  /**
   * Crea una nueva especie
   */
  createSpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const speciesData: DeepPartial<Species> = req.body;
      
      const newSpecies = await this.speciesService.createSpecies(speciesData);
      res.status(201).json(newSpecies);
    } catch (error) {
      console.error('Error al crear la especie:', error);
      res.status(500).json({ message: 'Error al crear la especie' });
    }
  };

  /**
   * Actualiza una especie existente
   */
  updateSpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const speciesData: DeepPartial<Species> = req.body;
      
      const exists = await this.speciesService.speciesExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Especie no encontrada' });
        return;
      }

      const updatedSpecies = await this.speciesService.updateSpecies(id, speciesData);
      res.status(200).json(updatedSpecies);
    } catch (error) {
      console.error('Error al actualizar la especie:', error);
      res.status(500).json({ message: 'Error al actualizar la especie' });
    }
  };

  /**
   * Elimina una especie
   */
  deleteSpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const exists = await this.speciesService.speciesExists(id);
      if (!exists) {
        res.status(404).json({ message: 'Especie no encontrada' });
        return;
      }

      const deleted = await this.speciesService.deleteSpecies(id);
      if (deleted) {
        res.status(200).json({ message: 'Especie eliminada con éxito' });
      } else {
        res.status(500).json({ message: 'Error al eliminar la especie' });
      }
    } catch (error) {
      console.error('Error al eliminar la especie:', error);
      res.status(500).json({ message: 'Error al eliminar la especie' });
    }
  };

  /**
   * Guarda múltiples especies
   */
  saveManySpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const speciesData: DeepPartial<Species>[] = req.body;
      
      if (!Array.isArray(speciesData)) {
        res.status(400).json({ message: 'Los datos deben ser un array de especies' });
        return;
      }

      const savedSpecies = await this.speciesService.saveManySpecies(speciesData);
      res.status(201).json(savedSpecies);
    } catch (error) {
      console.error('Error al guardar múltiples especies:', error);
      res.status(500).json({ message: 'Error al guardar múltiples especies' });
    }
  };

  /**
   * Obtiene la cantidad total de especies
   */
  countSpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.speciesService.countSpecies();
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error al obtener la cantidad de especies:', error);
      res.status(500).json({ message: 'Error al obtener la cantidad de especies' });
    }
  };
}