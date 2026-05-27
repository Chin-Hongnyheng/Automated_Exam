import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ADD THIS LINE: This allows your Vue app to talk to the server
  app.enableCors({
    origin: 'http://localhost:5173', // Your Vue dev server URL
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
