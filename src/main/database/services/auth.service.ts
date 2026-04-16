import { injectable } from 'inversify';
import * as crypto from 'crypto';
import { UserModel, UserEntity } from '../models/user.model.js';
import { CreateUserDto } from '../../../shared/dto/create-user.dto.js';
import { LoginDto } from '../../../shared/dto/login.dto.js';

export interface AuthToken {
  token: string;
  userId: string;
}

@injectable()
export class AuthService {
  private saltRounds = 10;

  public hashPassword(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  public verifyPassword(password: string, hashedPassword: string): boolean {
    const hashedInput = this.hashPassword(password);
    return hashedInput === hashedPassword;
  }

  public async register(dto: CreateUserDto): Promise<UserModel> {
    const existingUser = await UserEntity.findOne({ email: dto.email }).exec();
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = this.hashPassword(dto.password);
    const user = new UserEntity({
      ...dto,
      password: hashedPassword
    });
    
    return user.save();
  }

  public async login(dto: LoginDto): Promise<AuthToken> {
    const user = await UserEntity.findOne({ email: dto.email }).exec();
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = this.verifyPassword(dto.password, user.password);
    
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user._id.toString());
    
    return {
      token,
      userId: user._id.toString()
    };
  }

  public async verifyToken(token: string): Promise<UserModel | null> {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) {
        return null;
      }
      
      return UserEntity.findById(decoded.userId).exec();
    } catch {
      return null;
    }
  }

  private generateToken(userId: string): string {
    const timestamp = Date.now();
    const data = `${userId}:${timestamp}:${process.env.AUTH_SECRET || 'default-secret'}`;
    const signature = crypto.createHmac('sha256', process.env.AUTH_SECRET || 'default-secret').update(data).digest('hex');
    return Buffer.from(`${data}:${signature}`).toString('base64');
  }

  private decodeToken(token: string): { userId: string; timestamp: number } | null {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [userId, timestamp, secret, signature] = decoded.split(':');
      
      const data = `${userId}:${timestamp}:${secret}`;
      const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('hex');
      
      if (signature !== expectedSignature) {
        return null;
      }

      return {
        userId,
        timestamp: parseInt(timestamp, 10)
      };
    } catch {
      return null;
    }
  }

  public async logout(_token: string): Promise<void> {
    // Для stateless JWT токенов logout не требует действий на сервере
    // Клиент просто удаляет токен
  }
}
