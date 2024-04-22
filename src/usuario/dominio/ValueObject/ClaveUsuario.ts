import { Either } from "src/utilidad/Either";

export class ClaveUsuario{
    private clave: string;

    private constructor(clave: string){
        this.clave = clave;
    }

    getClaveUsuario(){
        return this.clave;
    }

    private isValid(): boolean{
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(this.clave) && this.clave.length>0;
    }

    static create(clave:string): Either<Error,ClaveUsuario>{
        const claveUsuario = new ClaveUsuario(clave);
        if(claveUsuario.isValid()){
            return Either.makeRight<Error,ClaveUsuario>(claveUsuario);
        }
        else{
            return Either.makeLeft<Error,ClaveUsuario>(new Error('La clave del usuario no es valida'));
        }
    }
}