import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UsersEntity } from '../entites/users.entity';
import { UserDTO, UserUpdateDTO } from '../dtos/user.dto';
import { ErrorManager } from 'src/config/error.manager';

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
      const emailExist = await this.userRepository.findOneBy({ email: body.email })
      if (emailExist) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El email ya esta siendo usado por otro usuario'
        })
      }

      const usernameExist = await this.userRepository.findOneBy({ username: body.username })
      if (usernameExist) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El username ya existe en el sistema'
        })
      }

      const fullNameExist = await this.userRepository.findOneBy({
        first_Name: body.first_Name,
        last_Name: body.last_Name
      })
      if (fullNameExist) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya existe un usuario con ese nombre apellidos'
        })
      }

      return await this.userRepository.save(body)
    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // LISTAR USUARIO que retorna una promesa con la lista de ususrios 
  /**
   * async findUsers 
   */
  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find()
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron ususarios en el sistema'
        })
      }
      return users
      
    } catch (error){
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
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
      const userID: UsersEntity = await this.userRepository.createQueryBuilder('user').where({ id }).getOneOrFail();
      if (!userID) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el ususario especificado'
        })
      }
      return userID

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
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
  public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'No se pudo modificar usuario en el sistema'
        })
      }
      return user;

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // ELIMINAR USUARIO POR EL ID 
  /**
    * async deleteUser 
  */
  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo Eliminar el usuario'
        })
      }
      return user; 

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }
}
