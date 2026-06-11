import { IProject } from "src/interfaces/project.interface";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: 'proyects' })
export class ProyectEntity extends BaseEntity implements IProject {
    @Column()
    name!: String;

    @Column()
    description!: String;
}