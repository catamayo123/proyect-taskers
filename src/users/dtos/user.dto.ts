// esto es una clase que va a contener todos los atributos de la calse usuario para validarlos

import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/config/roles";
import { UsersEntity } from "../entites/users.entity";
import { ProjectsEntity } from "src/projects/entites/projects.entity";

export class UserDTO {

    @IsNotEmpty() // no puede ser vacio 
    @IsString() // tiene que ser un String
    first_Name!: String;

    @IsNotEmpty()
    @IsString()
    last_Name!: String;

    @IsNotEmpty()
    @IsNumber()
    age!: Number;

    @IsNotEmpty()
    @IsString()
    email!: String;

    @IsNotEmpty()
    @IsString()
    username!: String;

    @IsNotEmpty()
    @IsString()
    password!: String;

    @IsNotEmpty()
    @IsEnum(ROLES) // enum o constante numerica de tipo rol. ROLE esta ubicado en src/config/roles
    role!: ROLES;
}

// clase para poder modificar sin ttener que pasar toda la clase DTO en el servicio, sino solamente el parametro por el cual
// se desee modificar

export class UserUpdateDTO {

    @IsOptional()
    @IsString()
    first_Name!: String;

    @IsOptional()
    @IsString()
    last_Name!: String;

    @IsOptional()
    @IsNumber()
    age!: Number;

    @IsOptional()
    @IsString()
    email!: String;

    @IsOptional()
    @IsString()
    username!: String;

    @IsOptional()
    @IsString()
    password!: String;

    @IsOptional()
    @IsEnum(ROLES) // enum o constante numerica de tipo rol. ROLE esta ubicado en src/config/roles
    role!: ROLES;
}

//Clase para validar la relacion *-* de usuarios y proyectos usersprojects.entity.ts
export class UserToProjectDTO {

    @IsNotEmpty() // no puede ser vacio 
    @IsEnum(ACCES_LEVEL) // es un ENUM o llave primaria de la relacion con el usuario y el proyecto 
    accesLevel!: ACCES_LEVEL;

    @IsNotEmpty() // no puede ser vacio 
    @IsUUID() // es un UUID o llave primaria de la relacion con el usuario
    user!: UsersEntity;

    @IsNotEmpty() // no puede ser vacio 
    @IsUUID() // es un UUID o llave primaria de la relacion con el proyecto
    project!: ProjectsEntity
}