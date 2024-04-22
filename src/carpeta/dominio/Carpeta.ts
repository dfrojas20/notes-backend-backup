import { Either } from "src/utilidad/Either";
import { IdCarpeta } from "./ValueObject/IdCarpeta";
import { NombreCarpeta } from "./ValueObject/NombreCarpeta";
import { IdUsuario } from "src/usuario/dominio/ValueObject/IdUsuario";

export class Carpeta{
    
    private id: IdCarpeta;
    private nombre: NombreCarpeta;
    private predeterminada: boolean;
    private idUsuario: IdUsuario;

    private constructor(nombre: NombreCarpeta, predeterminada: boolean,idUsuario: IdUsuario,id?: IdCarpeta){
        this.id = id;
        this.nombre = nombre;
        this.predeterminada = predeterminada;
        this.idUsuario = idUsuario;
    }

    public getId(): string{
        return this.id.getIDCarpeta();
    }

    public getNombre(): string{
        return this.nombre.getNombreCarpeta();
    }

    public getPredeterminada(): boolean{
        return this.predeterminada;
    }

    public getIdUsuario(): string{
        return this.idUsuario.getIDUsuario();
    }

    static create(nombre: string, predeterminada: boolean,idUsuario: string,id?: string): Either<Error,Carpeta>{
        if(!idUsuario || idUsuario.length == 0){
            return Either.makeLeft<Error,Carpeta>(new Error("No se puede crear una carpeta sin usuario"));
        }
        const nombreCarpeta = NombreCarpeta.create(nombre);
        if(nombreCarpeta.isRight()){
            return Either.makeRight<Error,Carpeta>(new Carpeta(nombreCarpeta.getRight(),predeterminada,IdUsuario.create(idUsuario),IdCarpeta.create(id)));
        }
        else{
            return Either.makeLeft<Error,Carpeta>(nombreCarpeta.getLeft());
        }
    }

}