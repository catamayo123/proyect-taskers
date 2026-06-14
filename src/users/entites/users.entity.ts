import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../config/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "./usersProyects.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    first_Name!: String;

    @Column()
    last_Name!: String;

    @Column()
    age!: Number;

    @Column({unique: true})
    email!: String;

    @Column({unique: true})
    username!: String;

    @Column()
    password!: String;

    @Column({ type: 'enum', enum: ROLES })
    role!: ROLES;

    @OneToMany( ()=> UsersProjectsEntity, (usersProjects)=> usersProjects.user )
    projectsIncludes!: UsersProjectsEntity[];
}
