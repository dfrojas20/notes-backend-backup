import { NestFactory } from '@nestjs/core';
import { AppModule } from './modulos/app.module';
import {json as expressJson, urlencoded as expressUrlEncoded} from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.use(expressJson({limit: '50mb'}));
  app.use(expressUrlEncoded({limit: '50mb', extended: true}));

  await app.listen(port, "0.0.0.0");
}
bootstrap();
