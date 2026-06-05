import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('saludos') // esto es un decorador y dentro de los () va la ruta adicional donde se va a ejecutar la funcion 
  getHello(): string {
    return this.appService.getHello();
  }
}
