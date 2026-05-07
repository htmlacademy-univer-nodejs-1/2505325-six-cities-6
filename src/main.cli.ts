#!/usr/bin/env node

import { CLIApplication } from './cli/cli-application.js';
import { container } from './main/container/inversify.config.js';
import { CommandInterface } from './commands/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  
  const commands: CommandInterface[] = [
    container.get<CommandInterface>('HelpCommand'),
    container.get<CommandInterface>('VersionCommand'),
    container.get<CommandInterface>('ImportCommand'),
    container.get<CommandInterface>('GenerateCommand'),
  ];
  
  cliApplication.registerCommands(commands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
 