import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsEntity } from '../entites/projects.entity';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';
import { ErrorManager } from 'src/config/error.manager';
import { UsersProjectsEntity } from 'src/users/entites/usersProjects.entity';

@Injectable()
export class ProjectsService {
  // inyectar el repositorio de class validator para poder usarlo
  constructor(
    @InjectRepository(ProjectsEntity) private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity) private readonly userProjectRepository: Repository<UsersProjectsEntity>
  ) { }

  // CRUD de Projects

  // CREAR PROYECTO
  /**
  * async 
  */
  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      const nameExist = await this.projectRepository.findOneBy({ name: body.name })
      if (nameExist) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El nombre del proyecto ya esta siendo usado'
        })
      }
      return await this.projectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // LISTAR PROYECTOS
  /**
  * async findProjects     
  */
  public async findProject(): Promise<ProjectsEntity[]> {
    try {
      const project: ProjectsEntity[] = await this.projectRepository.find()

      if (project.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron proyectos en el sistema'
        })
      }
      return project
    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // LISTAR PROYECTO POR EL ID
  /**
   * async findProjectById
   */
  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const projectID: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.userInclude', 'userInclude') // muestra la inclusion del usuario en el proyecto
        .leftJoinAndSelect('userInclude.user', 'user') // muestra la infomracion del usuario al que esta vinculado ese proyecto
        .getOneOrFail();
      return projectID
      
    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // MODIFICAR PROYECTO POR EL ID
  /**
   * async updateProject
   */
  public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(id, body)
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'No se pudo modificar el proyecto'
        })
      }
      return project

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

  // MODIFICAR PROYECTO POR EL ID
  /**
   * async updateProject
   */
  public async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id)
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo Eliminar el proyecto'
        })
      }
      return project

    } catch (error) {
      throw ErrorManager.createSignatureError(error instanceof Error ? error.message : String(error))
    }
  }

}
