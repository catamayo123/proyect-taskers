import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ErrorManager } from 'src/config/error.manager';
import { UsersEntity } from 'src/users/entites/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { PyloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor( private readonly userService: UsersService ) {}

  // VALIDAR QUE EL USUARIO SI EXISTE, EL PASS SEA IGAL QUE EL QUE ESTA EN LA BD
  async validarUser(username: string, password: string) {
    try {
      const userByUsername = await this.userService.finBy({
        key: 'username', // valor de la propiedad username
        value: username // valor del parametro username
      })

      const userByEmail = await this.userService.finBy({
        key: 'email',   // valor de la propiedad email
        value: username // valor del parametro username
      })

      // si el usuario existe buscado por el finBy(), comparame el pass de la BD contra el pass hasheado que entra por parametro
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

  // Firmar tokens
  singJWT({
    pyload,
    secret,
    expires
  }: {
    pyload: jwt.JwtPayload;
    secret: string;
    expires: number;
  }) {
    return jwt.sign(pyload, secret, { expiresIn: expires })
  }

  // GENERAR TOKENS, retorna el token y el usuario 
  async generateJWT(user: UsersEntity) : Promise<any>{
    const getUser = await this.userService.findUsersById(user.id)

    // crear objeto payload
    const pyload: PyloadToken = {
      sub: getUser.id,
      role: getUser.role
    } 

    return {
      accesToken: this.singJWT({
        pyload,
        secret: process.env.JWT_SECRET,
        expires: 1
      }),
      user
    }
  }

}
 