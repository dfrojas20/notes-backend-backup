import { Either } from "src/utilidad/Either";

export class NombreTarea{

    private nombre: string;

    private constructor(nombre: string) {
        this.nombre = nombre;
    }

    getNombreTarea() {
        return this.nombre;
    }

    private isValid(): boolean {
        return this.nombre.length > 0 && this.nombre.length <= 40;
    }

    static create(nombre: string): Either<Error,NombreTarea> {
        const nombreTarea = new NombreTarea(nombre);
        if(nombreTarea.isValid()){
            return Either.makeRight<Error,NombreTarea>(nombreTarea);
        }
        else{
            return Either.makeLeft<Error,NombreTarea>(new Error('El nombre de la tarea no es valido'));
        }
    }

}