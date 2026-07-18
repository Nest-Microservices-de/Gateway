import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcToHttpFilter } from './common';


async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  // Set the global prefix for all routes
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
// uso global del manejador de exception
app.useGlobalFilters(
    new RpcToHttpFilter()
);

  await app.listen(envs.PORT);

  logger.log(`Gateway is running on port ${envs.PORT}`);
}
bootstrap();
