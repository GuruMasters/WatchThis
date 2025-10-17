import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  role: 'client' | 'consultant' | 'admin';
  password: string;
  avatar?: string;
  bio?: string;
  specialties?: string[];
  hourlyRate?: number;
  availability?: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: number[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private users: Map<string, User> = new Map();

  async findById(uid: string): Promise<User | null> {
    try {
      // This would query Firebase Firestore
      return this.users.get(uid) || null;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      // This would query Firebase Firestore
      for (const user of this.users.values()) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async create(userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.findByEmail(userData.email!);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const user: User = {
        uid: userData.uid!,
        email: userData.email!,
        displayName: userData.displayName!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        company: userData.company,
        phone: userData.phone,
        role: userData.role || 'client',
        password: userData.password!,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData,
      };

      this.users.set(user.uid, user);
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Failed to create user');
    }
  }

  async update(uid: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedUser = {
        ...user,
        ...updateData,
        updatedAt: new Date(),
      };

      this.users.set(uid, updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update user');
    }
  }

  async updatePassword(uid: string, newPassword: string): Promise<void> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.users.set(uid, {
        ...user,
        password: newPassword,
        updatedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update password');
    }
  }

  async delete(uid: string): Promise<void> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.users.delete(uid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to delete user');
    }
  }

  async deactivate(uid: string): Promise<User> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const deactivatedUser = {
        ...user,
        isActive: false,
        updatedAt: new Date(),
      };

      this.users.set(uid, deactivatedUser);
      return deactivatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to deactivate user');
    }
  }

  async activate(uid: string): Promise<User> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const activatedUser = {
        ...user,
        isActive: true,
        updatedAt: new Date(),
      };

      this.users.set(uid, activatedUser);
      return activatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to activate user');
    }
  }

  async findByRole(role: User['role']): Promise<User[]> {
    try {
      return Array.from(this.users.values()).filter(user => user.role === role);
    } catch (error) {
      throw new Error('Failed to find users by role');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return Array.from(this.users.values());
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const lowercaseQuery = query.toLowerCase();
      return Array.from(this.users.values()).filter(user =>
        user.displayName.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.company?.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      throw new Error('Failed to search users');
    }
  }

  async updateProfile(uid: string, profileData: Partial<User>): Promise<User> {
    try {
      const user = await this.findById(uid);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedUser = {
        ...user,
        ...profileData,
        updatedAt: new Date(),
      };

      this.users.set(uid, updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update profile');
    }
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    clients: number;
    consultants: number;
    admins: number;
  }> {
    try {
      const users = Array.from(this.users.values());
      const activeUsers = users.filter(user => user.isActive);

      return {
        totalUsers: users.length,
        activeUsers: activeUsers.length,
        clients: users.filter(user => user.role === 'client').length,
        consultants: users.filter(user => user.role === 'consultant').length,
        admins: users.filter(user => user.role === 'admin').length,
      };
    } catch (error) {
      throw new Error('Failed to get user stats');
    }
  }
}
