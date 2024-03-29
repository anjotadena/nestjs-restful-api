import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set endpoint prefix
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    // pass every request a cookie
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
