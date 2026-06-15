import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule); // creando una instancia del modulo appModule
  app.setGlobalPrefix('api') // todas las rutas comenzaran con api/ lo que venga
  app.use(morgan('dev')) // mostrar el metodo, ubucacion, estado .... en consola

  // Configuracion inicial de un DTOs con class Validator y validar la informacion en base a los controladores
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  // Habilita CORS con opciones predeterminadas
  app.enableCors({
    origin: true, // Orígenes permitidos [], o en true para este caso pero en produccion poner el arr con los accesos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos HTTP permitidos
    credentials: true, // Permite que se envíen cookies y encabezados de autorización
  })

  //app.enableCors() // Habilita CORS con opciones predeterminadas

  const configService = app.get(ConfigService); // obteneniendo lo que esta en config
  await app.listen(+ configService.get('PORT')); // se coloca + para que se convierta en numero 
  console.log(`La app esta se esta ejecutando en: ${await app.getUrl()}`);
}
bootstrap();
