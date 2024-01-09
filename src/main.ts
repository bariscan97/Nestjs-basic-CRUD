import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { ValidatePipe } from './pipes/validate-pipe/validate-pipe';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('app');
  const configService = app.get(ConfigService)
  await app.listen(3000);

}
bootstrap();
