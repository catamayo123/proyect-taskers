import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entites/users.entity';
import { UserDTO, UserUpdateDTO } from '../dtos/user.dto';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
  // inyectar el repositorio de class validator para poder usarlo

  constructor(
    // @InjectRepository llama la entidad usuario y tienes que nombrar el atributo y poner su tipo, como es generico se le 
    // coloca el nombre de la entidad que pasas por parametro en @InjectRepository

    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>

  ) { }

  // CREAR USUARIO que retornara una promesa de tipo UsersEntity que respondera con el mismo objeto que se esta creando
  /**
   * async createUser (cuerpo del objeto) return promesa {creacion del usuario y retornar error en caso de que no se cree}
   */
  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body)
    } catch (error) {
      throw new Error('No se creo el Usuario. Error Inesperado')
    }
  }

  // LISTAR USUARIO que retorna una promesa con la lista de ususrios 
  /**
   * async findUsers 
   */
  public async findUsers(): Promise<UsersEntity[]> {
    try {
      return await this.userRepository.find()
    } catch (error) {
      throw new Error('No encontraron usuarios')
    }
  }

  // LISTAR USUARIO POR EL ID 
  /*
  retorna una promesas el usuario cuyos ID sean igual al pasado por parametro.
  el metodo createQueryBuilder() necesita un alias y en este caso es usuario, y es el que permite encadenar metodos,
  con el podemos acceder a la propiedad where para buscar el ID
  */
  /**
     * async findUsersById 
     */
  public async findUsersById(id: string): Promise<UsersEntity> {
    try {
      return await this.userRepository.createQueryBuilder('user').where({ id }).getOneOrFail();
    } catch (error) {
      throw new Error(`No se creo el Usuario con id: ${id}`)
    }
  }

  // MODIFICAR USUARIO POR EL ID 
  /*
    Aqui es donde se pone de manifiesto la clase UserUpdateDTO creada en el archivo user.dto.ts
    retorna una Promise < UpdateResult | undefined > porque despues sera manejada en el controlador
  */
  /**
    * async updateUser 
  */
  public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body)

      if (user.affected === 0) {
        return undefined; // hay que manejar que se va a responder aqui en el controlador
      }
      return user;
    } catch (error) {
      throw new Error(`No logro modificar el Usuario con id: ${id}`)
    }
  }

  // ELIMINAR USUARIO POR EL ID 
  /**
    * async deleteUser 
  */
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)

      if (user.affected === 0) {
        return undefined; // hay que manejar que se va a responder aqui en el controlador
      }
      return user;
    } catch (error) {
      throw new Error(`No logro modificar el Usuario con id: ${id}`)
    }
  }
}
