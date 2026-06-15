// esto es una clase que va a contener todos los atributos de la calse usuario para validarlos

import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ROLES } from "src/config/roles";

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