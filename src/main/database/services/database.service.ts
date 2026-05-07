import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { DatabaseServiceInterface } from './database-service.interface.js';
import { Logger } from 'pino';

@injectable()
export class DatabaseService implements DatabaseServiceInterface {
  private isConnected = false;

  constructor(@inject('Logger') private readonly logger: Logger) {}

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      this.logger.warn('Database connection already established');
      return;
    }

    try {
      this.logger.info(`Attempting to connect to database: ${uri}`);
      await mongoose.connect(uri);
      this.isConnected = true;
      this.logger.info('Successfully connected to database');
    } catch (error) {
      this.logger.error(`Failed to connect to database: ${(error as Error).message}`);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      this.logger.info('Disconnected from database');
    } catch (error) {
      this.logger.error(`Error disconnecting from database: ${(error as Error).message}`);
      throw error;
    }
  }
}
