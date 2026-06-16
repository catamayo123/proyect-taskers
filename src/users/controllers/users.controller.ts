import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';


@Controller('users')
export class UsersController {
  // aqui se colocan los decoradores de la clases que se vallana a usar
  constructor(private readonly userService: UsersService) {}
      
}
