import { Either } from "src/utilidad/Either";

export class NombreUsuario{
    private nombre: string;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    getNombreUsuario(){
        return this.nombre;
    }

    private isValid(): boolean{
        return this.nombre.length > 0 && this.nombre.length <= 40;
    }

    static create(nombre: string): Either<Error,NombreUsuario>{
        const nombreUsuario = new NombreUsuario(nombre);
        if(nombreUsuario.isValid()){
            return Either.makeRight<Error,NombreUsuario>(nombreUsuario);
        }
        else{
            return Either.makeLeft<Error,NombreUsuario>(new Error('El nombre del usuario no es valido'));
        }
    }
}