// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UsersService';
import { AppDataSource } from '../db/connection';
import { AuthService } from '../services/AuthService';

const userService = new UserService(AppDataSource);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    // Check if email already exists
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }
    
    const newUser = await userService.createUser({
      email,
      password,
      firstName,
      lastName
    });
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, role, isActive } = req.body;
    
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    const updatedUser = await userService.updateUser(userId, {
      firstName,
      lastName,
      isActive
    });
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// export const changePassword = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const { currentPassword, newPassword } = req.body;
    
//     const user = await userService.findByEmailWithPassword(req.params.email);
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
    
//     const isPasswordValid = await user.validatePassword(currentPassword);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Contraseña actual incorrecta' });
//     }
    
//     await userService.changePassword(userId, newPassword);
    
//     return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    
    const success = await userService.deactivateUser(userId);
    if (!success) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    return res.status(200).json({ message: 'Usuario desactivado correctamente' });
  } catch (error) {
    console.error('Error deactivating user:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};