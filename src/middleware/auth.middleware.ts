import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interfaz para extender Request con usuario
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Middleware para validar API Key (para la landing)
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.LANDING_API_KEY) {
    res.status(401).json({ message: 'Acceso no autorizado' });
    return;
  }
  
  next();
};

// Middleware para validar JWT (para el CMS)
export const jwtAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
}