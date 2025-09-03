// src/services/user.service.ts
import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from '../models/Users';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }

  async deactivateUser(id: string): Promise<boolean> {
    const result = await this.userRepository.update(id, { isActive: false });
    return result.affected ? result.affected > 0 : false;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLogin: new Date() });
  }

  async changePassword(id: string, newPassword: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) return false;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const result = await this.userRepository.update(id, { password: hashedPassword });
    return result.affected ? result.affected > 0 : false;
  }

  async seedAdminUser(email: string, password: string): Promise<User | null> {
    // Check if admin user already exists
    const existingAdmin = await this.findByEmail(email);
    if (existingAdmin) return existingAdmin;

    // Create admin user if it doesn't exist
    const adminUser = this.userRepository.create({
      firstName: 'Admin',
      lastName: 'User',
      email,
      password
    });

    return this.userRepository.save(adminUser);
  }
}