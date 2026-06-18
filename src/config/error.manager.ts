// CLASE PARA MANEJAE ERRORES
/*
 - Tiene 2 atributos, el error y el tipo de error 
 - El tipo de error TYPE que es de tipo HttpStatus, permite coger el codigo de estado y lo que significa y la propiedad
    message de tipo String, coger el mensaje 
 - Luego se llaman a las 2 propiedades en el constructor 
*/

import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error {
    constructor({ type, message }: { type: keyof typeof HttpStatus, message: string }) {

        // herencia de la CLase Error con las peopiedades de la clase como parametros 
        super(`${type} :: ${message}`)
    }

    // Este metodo al ser estatico no hay que instancear la calse para poder llamar la funcion
    public static createSignatureError(message: string) {
        // El indice 0 es donde esta almacenada la info de la propeidad Type de la clase
        const name = message.split(" :: ")[0]

        if (name) {
            throw new HttpException(message, HttpStatus[name])
        } else {
            throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR )
        }
    }
}