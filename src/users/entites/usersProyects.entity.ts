// entidad de la relacion muchos a muchos
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/configDataSourse/base.entity";
import { ACCES_LEVEL } from "src/configDataSourse/roles";
import { UsersEntity } from "./users.entity";
import { ProyectsEntity } from "src/projects/entites/projects,entity";

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
    @Column({ type: 'enum', enum: ACCES_LEVEL })
    accesLevel!: ACCES_LEVEL

    @ManyToOne( ()=> UsersEntity, (user)=> user.projectsIncludes )
    user!: UsersEntity

    @ManyToOne( ()=> ProyectsEntity, (project)=> project.userInclude )
    project!: ProyectsEntity
}