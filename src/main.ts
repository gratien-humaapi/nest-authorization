import { NestFactory } from '@nestjs/core';
import express from 'express';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.use(express.json());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
