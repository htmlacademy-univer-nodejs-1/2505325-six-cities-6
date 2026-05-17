import { RequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IMiddleware } from '../interfaces/middleware.interface.js';

export class ValidateDtoMiddleware implements IMiddleware {
  private readonly dtoClass: new () => object;

  constructor(dtoClass: new () => object) {
    this.dtoClass = dtoClass;
  }

  public execute: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(this.dtoClass, req.body, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const validationErrors = this.formatValidationErrors(errors);
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors,
      });
      return;
    }

    req.body = dtoInstance;

    next();
  };

  private formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }

      if (error.children && error.children.length > 0) {
        const nestedErrors = this.formatValidationErrors(error.children);
        messages.push(...nestedErrors);
      }
    }

    return messages;
  }
}
