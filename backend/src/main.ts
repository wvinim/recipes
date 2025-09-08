import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:5173', // Altere para a URL do seu frontend em produção
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('API de Receitas')
    .setDescription('Documentação da API de Receitas')
    .setVersion('1.0')
    .addTag('users', 'Para iniciar, registre um usuário')
    .addTag('auth', 'Faça login com qualquer usuário para gerar um cookie com o token')
    .addTag('recipes', 'Todas as rotas das receitas precisam do cookie com o token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
