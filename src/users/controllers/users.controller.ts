import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dtos/user.dto';


@Controller('users')
export class UsersController {
  // aqui se colocan los decoradores de la clases que se vallana a usar
  constructor(private readonly userService: UsersService) {}
  
  // Decorador POST para CREAR USUARIOS path http://localhost:8000/api/users/registrarU
  @Post('registrarU')
  public async registrarUsuario( @Body() body:UserDTO ) {
    return await this.userService.createUser(body)
  }

  // Decorador GET para LISTAR TODOS los Usuarios path http://localhost:8000/api/users/listaru
  @Get('listaru')
  public async listarUsuarios() {
    return await this.userService.findUsers()
  }

  // Decorador GET para LISTAR usuarios por el ID path http://localhost:8000/api/users/id que se desea
  @Get(':id')
  public async listarUserID(@Param('id') id: string) {
    return await this.userService.findUsersById(id)
  }

  // Decorador PUT para modoficar usuarios por el id path http://localhost:8000/api/users/editarU/:id
  @Put('editarU/:id')
  public async editarUser( @Body() body: UserUpdateDTO, @Param('id') id: string) {
    return await this.userService.updateUser( body, id )
  }

  // Decorador DELETE para ELIMINAR usuarios por el id path http://localhost:8000/api/users/deleteU/:id
  @Delete('deleteU/:id')
  public async deleteUser( @Param('id') id: string ) {
    return await this.userService.deleteUser(id)
  }

  // Decorador POST para CREAR RELACION *-* USERSPREJECTS path http://localhost:8000/api/users/users-to-projects
  @Post('users-to-projects')
  public async registrarUserToProjects( @Body() body: UserToProjectDTO ) {
    return await this.userService.relacionUserToProject(body)
  }

}
