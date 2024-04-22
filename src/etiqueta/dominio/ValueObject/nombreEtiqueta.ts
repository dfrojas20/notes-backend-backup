import { Either } from "src/utilidad/Either";

export class NombreEtiqueta {
    private nombre: string;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    getNombre(){
        return this.nombre;
    }

    isValid(): boolean{
        return this.nombre.length > 0;
    }

    static create(nombre: string): Either<Error,NombreEtiqueta>{
        const nombreEtiqueta = new NombreEtiqueta(nombre);
        if(nombreEtiqueta.isValid()){
            return Either.makeRight<Error,NombreEtiqueta>(nombreEtiqueta);
        }else{ 
            return Either.makeLeft<Error,NombreEtiqueta>(new Error('El nombre de la etiqueta no puede estar vacio'));
        }
    }
}