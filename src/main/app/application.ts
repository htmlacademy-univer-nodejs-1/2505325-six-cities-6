import { inject, injectable } from 'inversify';
import { configSchema } from '../config/index.js';
import { Logger } from 'pino';
import express, { Application as ExpressApp } from 'express';

@injectable()
class Application {
  private readonly expressApp: ExpressApp;

  constructor(@inject('Logger') private readonly logger: Logger) {
    this.expressApp = express();
  }

  public async init(): Promise<void> {
    const port = configSchema.get('port');
    
    return new Promise((resolve, reject) => {
      try {
        const server = this.expressApp.listen(port, () => {
          this.logger.info('Application initialized');
          this.logger.info(`Server started on port ${port}`);
          resolve();
        });

        server.on('error', (err: NodeJS.ErrnoException) => {
          this.logger.error(err, 'Failed to start server');
          reject(err);
        });
      } catch (err) {
        this.logger.error(err, 'Unexpected error during initialization');
        reject(err);
      }
    });
  }

  public getExpressApp(): ExpressApp {
    return this.expressApp;
  }
}

export { Application };
