import { Request, Response } from "express";
import { ProductsService } from "../services/ProductsService";
import { Products } from "../models/Products";

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  /**
   * Obtiene todos los productos
   */
  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productsService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  };

  /**
   * Obtiene todos los productos con sus relaciones
   */
  getAllWithRelations = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productsService.getAllWithRelations();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos con relaciones:", error);
      res.status(500).json({ message: "Error al obtener productos con relaciones" });
    }
  };

  /**
   * Obtiene un producto por su ID
   */
  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productsService.getProductById(id);
      
      if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      
      res.status(200).json(product);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener el producto" });
    }
  };

  /**
   * Obtiene un producto por su ID con relaciones
   */
  getProductWithRelations = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productsService.getProductWithRelations(id);
      
      if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      
      res.status(200).json(product);
    } catch (error) {
      console.error(`Error al obtener el producto con relaciones ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al obtener el producto con relaciones" });
    }
  };

  /**
   * Crea un nuevo producto
   */
  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const productData = req.body;
      const newProduct = await this.productsService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error al crear el producto" });
    }
  };

  /**
   * Actualiza un producto existente
   */
  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const productData = req.body;
      const updatedProduct = await this.productsService.updateProduct(id, productData);
      
      if (!updatedProduct) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  };

  /**
   * Elimina un producto
   */
  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.productsService.deleteProduct(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  };

  /**
   * Verifica si existe un producto
   */
  productExists = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const exists = await this.productsService.productExists(id);
      res.status(200).json({ exists });
    } catch (error) {
      console.error(`Error al verificar la existencia del producto con ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Error al verificar la existencia del producto" });
    }
  };

  /**
   * Guarda múltiples productos
   */
  saveManyProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const productsData = req.body;
      const savedProducts = await this.productsService.saveManyProducts(productsData);
      res.status(201).json(savedProducts);
    } catch (error) {
      console.error("Error al guardar múltiples productos:", error);
      res.status(500).json({ message: "Error al guardar múltiples productos" });
    }
  };

  /**
   * Obtiene productos por categoría - Comentado porque está comentado en el servicio
   */
  // getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const categoryId = parseInt(req.params.categoryId);
  //     const products = await this.productsService.getProductsByCategory(categoryId);
  //     res.status(200).json(products);
  //   } catch (error) {
  //     console.error(`Error al obtener productos por categoría ID ${req.params.categoryId}:`, error);
  //     res.status(500).json({ message: "Error al obtener productos por categoría" });
  //   }
  // };

  /**
   * Busca productos por nombre o descripción - Comentado porque está comentado en el servicio
   */
  // searchProducts = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const query = req.query.q as string;
  //     if (!query) {
  //       res.status(400).json({ message: "Parámetro de búsqueda requerido" });
  //       return;
  //     }
  //     const products = await this.productsService.searchProducts(query);
  //     res.status(200).json(products);
  //   } catch (error) {
  //     console.error(`Error al buscar productos con consulta '${req.query.q}':`, error);
  //     res.status(500).json({ message: "Error al buscar productos" });
  //   }
  // };

  /**
   * Obtiene la cuenta total de productos
   */
  countProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.productsService.countProducts();
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error al contar los productos:", error);
      res.status(500).json({ message: "Error al contar los productos" });
    }
  };
}