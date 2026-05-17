import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRoute, IController } from '../interfaces/route.interface.js';
import { injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError, ConflictError } from '../filters/exception-filter.js';

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
    const middlewares = route.middlewares || [];
    this._router[route.method](route.path,... middlewares , route.handler);
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

  protected badRequest(message = 'Bad Request'): never {
    throw new BadRequestError(message);
  }

  protected unauthorized(message = 'Unauthorized'): never {
    throw new UnauthorizedError(message);
  }

  protected forbidden(message = 'Forbidden'): never {
    throw new ForbiddenError(message);
  }

  protected notFound(message = 'Not Found'): never {
    throw new NotFoundError(message);
  }

  protected conflict(message = 'Conflict'): never {
    throw new ConflictError(message);
  }

  protected internalServerError(message = 'Internal Server Error'): never {
    throw new Error(message);
  }
}
