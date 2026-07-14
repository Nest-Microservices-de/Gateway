import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  // Set the global prefix for all routes
  app.setGlobalPrefix('api');
  await app.listen(envs.PORT);

  logger.log(`Gateway is running on port ${envs.PORT}`);
}
bootstrap();
