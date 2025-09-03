// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = "";

  @Column({ length: 100 })
  firstName: string = "";

  @Column({ length: 100 })
  lastName: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column({ select: false })
  password: string = ""; 

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ nullable: true })
  lastLogin: Date = new Date;

  @CreateDateColumn()
  createdAt: Date = new Date;

  @UpdateDateColumn()
  updatedAt: Date = new Date;

  // Hash password before inserting or updating
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Only hash the password if it was modified
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Method to validate password
  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  // Method to return user data without sensitive information
  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}