import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/configDataSourse/base.entity";
import { IProject } from "src/interfaces/project.interface";
import { UsersProjectsEntity } from "src/users/entites/usersProyects.entity";

@Entity({ name: 'proyects' })
export class ProyectsEntity extends BaseEntity implements IProject {
    @Column()
    name!: String;

    @Column()
    description!: String;

    userInclude!: UsersProjectsEntity[]
}