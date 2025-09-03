import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/Users';

export class AuthService {
  // Método para generar JWT para usuarios del CMS
  static generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email, 
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET as string, { 
      expiresIn: '8h' 
    });
  }
  
  // Método para validar credenciales
  static async validateUser(email: string, password: string): Promise<User | null> {
    // Aquí iría la lógica para buscar el usuario en la base de datos
    // y validar la contraseña con bcrypt.compare
    // ...
    
    return null; // Reemplazar con lógica real
  }
}