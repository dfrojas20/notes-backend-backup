import { idEtiqueta } from "./ValueObject/idEtiqueta";
import { Either } from "src/utilidad/Either";
import { NombreEtiqueta } from "./ValueObject/nombreEtiqueta";
import { IdUsuario } from "src/usuario/dominio/ValueObject/IdUsuario";



export class Etiqueta {

    private id: idEtiqueta;
    private nombre: NombreEtiqueta;
    private usuario:IdUsuario;

    private constructor( nombre: NombreEtiqueta,usuario:IdUsuario,id?: idEtiqueta){
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
    }

    getID(): string{
        return this.id.getIDEtiqueta();
    }

    getNombre(): string{
        return this.nombre.getNombre();
    }

    getUsuario(): string{
        return this.usuario.getIDUsuario();
    }

    static create(nombre: string, usuario:string ,id?: string): Either<Error,Etiqueta>{

        const nombreEtiqueta = NombreEtiqueta.create(nombre);
        if(nombreEtiqueta.isRight()){
            return Either.makeRight<Error,Etiqueta>(new Etiqueta(nombreEtiqueta.getRight(),IdUsuario.create(usuario),idEtiqueta.create(id)));
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(nombreEtiqueta.getLeft());
        }

    }





}