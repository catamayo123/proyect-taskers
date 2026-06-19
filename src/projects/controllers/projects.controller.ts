import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';

@Controller('project')
export class ProjectsController {
    
    constructor(private readonly projecService: ProjectsService){}
    // aqui se colocan los decoradores de la clases que se vallana a usar
    
      // Decorador POST para crear proyectos path http://localhost:8000/api/project/registrarP
      @Post('registrarP')
      public async registrarProyecto( @Body() body:ProjectDTO ) {
        return await this.projecService.createProject(body)
      }
    
      // Decorador GET para LISTAR TODOS los proyectos path http://localhost:8000/api/project/listarP
      @Get('listarP')
      public async listarProjects() {
        return await this.projecService.findProject()
      }
    
      // Decorador GET para LISTAR proyecto por el ID path  http://localhost:8000/api/project/id
      @Get(':id')
      public async listarProjectID(@Param('id') id: string) {
        return await this.projecService.findProjectById(id)
      }
    
      // Decorador PUT para modoficar usuarios por el id path http://localhost:8000/api/project/editarP/:id
      @Put('editarP/:id')
      public async editarProject( @Body() body: ProjectUpdateDTO, @Param('id') id: string) {
        return await this.projecService.updateProject( body, id )
      }
    
      // Decorador DELETE para ELIMINAR usuarios por el id path http://localhost:8000/api/project/deleteU/:id
      @Delete('deleteU/:id')
      public async deleteUser( @Param('id') id: string ) {
        return await this.projecService.deleteProject(id)
      }
}
