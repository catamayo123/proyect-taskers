import { Column, Entity, OneToMany } from "typeorm";
import { IProject } from "../../interfaces/project.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersProjectsEntity } from "../../users/entites/usersProjects.entity";

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @OneToMany( ()=> UsersProjectsEntity, (usersProjects)=> usersProjects.project )
    userInclude!: UsersProjectsEntity[]
}