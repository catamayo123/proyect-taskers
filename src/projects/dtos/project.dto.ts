// esto es una clase que va a contener todos los atributos de la calse usuario para validarlos

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProjectDTO {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;
}

// valdiar update
export class ProjectUpdateDTO {

    @IsOptional()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description!: string;
}