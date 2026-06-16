// esto es una clase que va a contener todos los atributos de la calse usuario para validarlos

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProjectDTO {

    @IsNotEmpty()
    @IsString()
    name!: String;

    @IsNotEmpty()
    @IsString()
    description!: String;
}

// valdiar update
export class ProjectUpdateDTO {

    @IsOptional()
    @IsString()
    name!: String;

    @IsOptional()
    @IsString()
    description!: String;
}