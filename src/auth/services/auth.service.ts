import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/config/error.manager';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) { }

  // VALIDAR QUE EL USUARIO SI EXISTE, EL PASS SEA IGAL QUE EL QUE ESTA EN LA BD
  /**
   * async validarUser (username: string, password: string )
 */
  public async validarUser(username: string, password: string) {
    try {
      const userByUsername = await this.userService.finBy({
        key: 'username', // valor de la propiedad username
        value: username // valor del parametro username
      })

      const userByEmail = await this.userService.finBy({
        key: 'email',   // valor de la propiedad email
        value: username // valor del parametro username
      })

      // si el usuario existe buscado por el username, comparame los pass de la BD contra el pass hasheado que entra por parametro
      if (userByUsername) {
        const match = await bcrypt.compare(password, userByUsername.password)
        if (match) return userByUsername
      }

      // si el usuario existe buscado por el email, comparame los pass de la BD contra el pass hasheado que entra por parametro
      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password)
        if (match) return userByEmail
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }

  }


}
