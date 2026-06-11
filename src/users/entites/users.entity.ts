import { IUser } from "src/interfaces/user.interface";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    first_Name!: String;

    @Column()
    last_Name!: String;

    @Column()
    age!: Number;

    @Column()
    email!: String;

    @Column()
    username!: String;

    @Column()
    password!: String;

    @Column()
    role!: String;
}
