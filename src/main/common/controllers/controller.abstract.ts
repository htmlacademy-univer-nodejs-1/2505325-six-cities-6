import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRoute, IController } from '../interfaces/route.interface.js';
import { injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public addRoute(route: IRoute): void {
    this._router[route.method](route.path, route.handler);
  }
  
  protected transformToDto<T extends object>(dtoClass: new () => T, plainObject: unknown): T {
    return plainToInstance(dtoClass, plainObject, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
  protected ok<T>(res: Response, data?: T, message?: string): void {
    res.status(StatusCodes.OK).json({
      status: 'ok',
      message: message || 'Success',
      data,
    });
  }

  protected created<T>(res: Response, data?: T, message?: string): void {
    res.status(StatusCodes.CREATED).json({
      status: 'created',
      message: message || 'Created',
      data,
    });
  }

  protected noContent(res: Response): void {
    res.status(StatusCodes.NO_CONTENT).send();
  }

  protected badRequest(res: Response, message: string = 'Bad Request'): void {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message,
    });
  }

  protected unauthorized(res: Response, message: string = 'Unauthorized'): void {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message,
    });
  }

  protected forbidden(res: Response, message: string = 'Forbidden'): void {
    res.status(StatusCodes.FORBIDDEN).json({
      status: 'error',
      message,
    });
  }

  protected notFound(res: Response, message: string = 'Not Found'): void {
    res.status(StatusCodes.NOT_FOUND).json({
      status: 'error',
      message,
    });
  }

  protected conflict(res: Response, message: string = 'Conflict'): void {
    res.status(StatusCodes.CONFLICT).json({
      status: 'error',
      message,
    });
  }

  protected internalServerError(res: Response, message: string = 'Internal Server Error'): void {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message,
    });
  }
}