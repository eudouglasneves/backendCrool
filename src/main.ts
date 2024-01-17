import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ exposedHeaders: 'Content-Range' }));
  await app.listen(3000);
}
bootstrap();
