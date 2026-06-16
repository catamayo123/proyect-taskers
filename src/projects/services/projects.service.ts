import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsEntity } from '../entites/projects.entity';
import { ProjectDTO, ProjectUpdateDTO } from '../dtos/project.dto';

@Injectable()
export class ProjectsService {
    // inyectar el repositorio de class validator para poder usarlo
    constructor(
        @InjectRepository(ProjectsEntity) private readonly projectRepository: Repository<ProjectsEntity>
    ) { }

    // CRUD de Projects

    // CREAR PROYECTO
    /**
    * async 
    */
    public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
        try {
            return await this.projectRepository.save(body);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    // LISTAR PROYECTOS
    /**
    * async findProjects     
    */
    public async findProject(): Promise<ProjectsEntity[]> {
        try {
            return await this.projectRepository.find();
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    // LISTAR PROYECTO POR EL ID
    /**
     * async findProjectById
     */
    public async findProjectById(id: string): Promise<ProjectsEntity> {
        try {
            return await this.projectRepository.createQueryBuilder('project').where({ id }).getOneOrFail();
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    // MODIFICAR PROYECTO POR EL ID
    /**
     * async updateProject
     */
    public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const project: UpdateResult = await this.projectRepository.update(id,body)
            if (project.affected === 0) {
                return undefined; // hay que manejar que se va a responder aqui en el controlador
            }
            return project

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

    // MODIFICAR PROYECTO POR EL ID
    /**
     * async updateProject
     */
    public async deleteProject(id: string): Promise<DeleteResult | undefined> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id)
            if (project.affected === 0) {
                return undefined; // hay que manejar que se va a responder aqui en el controlador
            }
            return project
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
        }
    }

}
