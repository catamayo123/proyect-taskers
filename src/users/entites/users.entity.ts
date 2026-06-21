import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../config/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "./usersProjects.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    first_Name: string;

    @Column()
    last_Name: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ROLES })
    role!: ROLES;

    @OneToMany( ()=> UsersProjectsEntity, (usersProjects)=> usersProjects.user )
    projectsIncludes!: UsersProjectsEntity[];
}
