import { Column, Entity, OneToMany } from "typeorm";
import { IProject } from "../../interfaces/project.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersProjectsEntity } from "../../users/entites/usersProyects.entity";

@Entity({ name: 'proyects' })
export class ProjectsEntity extends BaseEntity implements IProject {
    @Column()
    name!: String;

    @Column()
    description!: String;

    @OneToMany( ()=> UsersProjectsEntity, (usersProjects)=> usersProjects.project )
    userInclude!: UsersProjectsEntity[]
}