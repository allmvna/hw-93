import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SeedModule } from './seed.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SeedModule);
  const seedService = app.get(SeederService);
  await seedService.seed();
  await app.close();
}
bootstrap();
