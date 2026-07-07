import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import type { AuthBody } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login( @Body() {username, password}: AuthBody ){
    const userValidate = await this.authService.validarUser(username, password)
    
    if (!userValidate) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos')
    }
    
    return await this.authService.generateJWT(userValidate);
  }
}
