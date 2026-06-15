import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entites/users.entity';

@Injectable()
export class UsersService {
  // inyectar el repositorio de class validator para poder usarlo

  constructor(
    // @InjectRepository llama la entidad usuario y tienes que nombrar el atributo y poner su tipo, como es generico se le 
    // coloca el nombre de la entidad que pasas por parametro en @InjectRepository

    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>

  ) { }
  getHello(): string {
    return ' Hola Usuario !';
  }
}
