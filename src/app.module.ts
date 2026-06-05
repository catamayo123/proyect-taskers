import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule], // 1. Módulos externos que se importan
  controllers: [AppController],  // 2. Controladores que pertenecen a este módulo
  providers: [AppService], // 3. Servicios o proveedores disponibles
})
// Explicacion del decorador @Module
/* 
  1. imports: []
    - Aquí se colocan otros módulos que este módulo necesita usar.
    - Por ejemplo: si quieres usar base de datos, autenticación, o módulos de terceros, los importas aquí.
    - Actualmente está vacío ([]) porque es la configuración por defecto y aún no se ha importado ningún módulo adicional.

  2. controllers: [AppController]
    - Aquí se registran los controladores que pertenecen a este módulo.
    - Los controladores son los encargados de recibir las peticiones HTTP (como GET, POST, etc.) y manejar las rutas.
    - En este caso, NestJS incluye por defecto el AppController, que es el controlador principal.

  3. providers: [AppService]
    - Aquí se registran los proveedores (generalmente servicios).
    - Los providers son clases que contienen la lógica de negocio (por ejemplo, conexiones a base de datos, cálculos, validaciones, etc.).
    - AppService es el servicio por defecto que NestJS crea junto con el controlador.
*/

export class AppModule {}
