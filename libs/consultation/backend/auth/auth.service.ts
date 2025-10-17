import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FirebaseService } from '../firebase/firebase.service';
import { UsersService } from '../users/users.service';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'client' | 'consultant' | 'admin';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  role: 'client' | 'consultant' | 'admin';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    try {
      // This would typically validate against Firebase Auth
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return null;
      }

      // In a real implementation, you'd verify the Firebase token
      // For now, we'll return the user if found
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; user: AuthUser }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.uid,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string; user: AuthUser }> {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create user in Firebase
      const firebaseUser = await this.firebaseService.createUser({
        email: registerDto.email,
        password: registerDto.password,
        displayName: registerDto.displayName,
      });

      // Create user in our database
      const user = await this.usersService.create({
        uid: firebaseUser.uid,
        email: registerDto.email,
        displayName: registerDto.displayName,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        company: registerDto.company,
        phone: registerDto.phone,
        role: registerDto.role,
        password: hashedPassword,
      });

      const authUser: AuthUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      };

      const payload = {
        sub: user.uid,
        email: user.email,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: authUser,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Registration failed');
    }
  }

  async refreshToken(userId: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = {
      sub: user.uid,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    // Update password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(userId, hashedNewPassword);

    // Update Firebase password if needed
    await this.firebaseService.updateUserPassword(user.email, newPassword);
  }

  async resetPassword(email: string): Promise<void> {
    try {
      // This would typically send a password reset email via Firebase
      console.log(`Password reset requested for: ${email}`);
    } catch (error) {
      throw new BadRequestException('Failed to send password reset email');
    }
  }

  async validateJwtPayload(payload: any): Promise<AuthUser> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    };
  }
}
