import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe)

  app.enableCors({
    origin: '*', // Allow all origins (replace * with your Flutter app URL in production)
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  });

  
  const config = new DocumentBuilder()
  .setTitle('Senticare')
  .setDescription('API documentation for Senticare')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.0/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.0/swagger-ui-standalone-preset.js'
    ]
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
