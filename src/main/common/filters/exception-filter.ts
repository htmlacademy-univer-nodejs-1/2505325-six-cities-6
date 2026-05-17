import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'pino';
import { inject, injectable } from 'inversify'

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(StatusCodes.CONFLICT, message);
  }
}

@injectable()
export class ExceptionFilter {
  constructor(
    @inject('Logger') private readonly logger: Logger) {}

  public catch(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpError) {
      this.handleHttpError(err, res);
    } else {
      this.handleInternalError(err, res);
    }
  }

  private handleHttpError(err: HttpError, res: Response): void {
    this.logger.warn({
      statusCode: err.statusCode,
      message: err.message,
      path: res.req.path,
      method: res.req.method,
    }, 'HTTP Error occurred');

    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  private handleInternalError(err: Error, res: Response): void {
    this.logger.error({
      message: err.message,
      stack: err.stack,
      path: res.req.path,
      method: res.req.method,
    }, 'Internal Server Error occurred');

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
