import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Logger } from 'pino';
import { UserService } from '../../database/index.js';
import { CreateUserDto, LoginDto } from '../../../shared/dto/index.js';
import { plainToInstance } from 'class-transformer';
import { Controller } from './controller.abstract.js';

@injectable()
export class UserController extends Controller {
  constructor(
    @inject('Logger') private readonly logger: Logger,
    @inject(UserService) private readonly userService: UserService
  ) {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.addRoute({
      path: '/users',
      method: 'post',
      handler: asyncHandler(this.create.bind(this)),
    });

    this.addRoute({
      path: '/login',
      method: 'post',
      handler: asyncHandler(this.login.bind(this)),
    });

    this.addRoute({
      path: '/logout',
      method: 'post',
      handler: asyncHandler(this.logout.bind(this)),
    });

    this.addRoute({
      path: '/users/status',
      method: 'get',
      handler: asyncHandler(this.checkStatus.bind(this)),
    });
  }

  private async create(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(CreateUserDto, req.body, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    this.logger.info('Creating new user with email:', dto.email);

    const user = await this.userService.create(dto);
    this.created(res, user, 'User created successfully');
  }

  private async login(req: Request, res: Response): Promise<void> {
    const dto = plainToInstance(LoginDto, req.body, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    this.logger.info('User login attempt with email:', dto.email);

    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.notFound('User not found');
    }

    // TODO: Add password verification and token generation
    this.ok(res, user, 'Login successful');
  }

  private async logout(req: Request, res: Response): Promise<void> {
    this.logger.info('User logout');
    // TODO: Implement logout logic (remove token, etc)
    this.ok(res, null, 'Logout successful');
  }

  private async checkStatus(req: Request, res: Response): Promise<void> {
    this.logger.info('Checking user status');
    this.ok(res, null, 'User status checked');
  }
}
