import { Either } from "src/utilidad/Either";

export class CorreoUsuario{
    private correo: string;

    private constructor(correo: string){
        this.correo = correo;
    }

    getCorreoUsuario(){
        return this.correo;
    }

    private isValid(): boolean{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(this.correo) && this.correo.length>0;
    }

    static create(correo:string): Either<Error,CorreoUsuario>{
        const correoUsuario = new CorreoUsuario(correo);
        if(correoUsuario.isValid()){
            return Either.makeRight<Error,CorreoUsuario>(correoUsuario);
        }
        else{
            return Either.makeLeft<Error,CorreoUsuario>(new Error('El correo del usuario no es valido'));
        }
    }
}