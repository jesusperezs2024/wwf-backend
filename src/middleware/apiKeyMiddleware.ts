import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Middleware para validar la API key en los headers de la petición
 */
export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  const configuredApiKey = process.env.LANDING_API_KEY;
  
  // Verificar si se ha configurado una API key
  if (!configuredApiKey) {
    console.error('LANDING_API_KEY is not set in environment variables');
    res.status(500).json({ 
      success: false, 
      error: 'API key is not configured on the server' 
    });
    return;
  }
  
  // Verificar si la petición incluye una API key
  if (!apiKey) {
    res.status(401).json({ 
      success: false, 
      error: 'API key is required',
      message: 'Please include x-api-key header in your request'
    });
    return;
  }
  
  // Verificar si la API key es válida
  if (apiKey !== configuredApiKey) {
    res.status(403).json({ 
      success: false, 
      error: 'Invalid API key'
    });
    return;
  }
  
  // Si la API key es válida, continuar
  next();
};