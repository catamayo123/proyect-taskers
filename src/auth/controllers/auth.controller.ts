import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from '../DTO/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: AuthDTO) {
    const userValidate = await this.authService.validarUser(body.username, body.password)

    if (!userValidate) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos')
    }
    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
