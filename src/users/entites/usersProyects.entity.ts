// entidad de la relacion muchos a muchos
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ACCES_LEVEL } from "../../config/roles";
import { UsersEntity } from "./users.entity";
import { ProjectsEntity } from "../../projects/entites/projects.entity";

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
    @Column({ type: 'enum', enum: ACCES_LEVEL })
    accesLevel!: ACCES_LEVEL

    @ManyToOne( ()=> UsersEntity, (user)=> user.projectsIncludes )
    user!: UsersEntity

    @ManyToOne( ()=> ProjectsEntity, (project)=> project.userInclude )
    project!: ProjectsEntity
}