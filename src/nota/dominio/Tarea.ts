import { Either } from "src/utilidad/Either";
import { IdTarea } from "./ValueObject/IdTarea";
import { NombreTarea } from "./ValueObject/NombreTarea";
import { IdNota } from "./ValueObject/IdNota";

export class Tarea{
    
    private id: IdTarea;
    private nombre: NombreTarea;
    private completada: boolean;
    private idNota: IdNota;

    private constructor(nombre: NombreTarea, completada: boolean, idNota: IdNota,id?: IdTarea){
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
        this.idNota = idNota;
    }

    getId(): string{
        return this.id.getIdTarea();
    }

    getNombre(): string{
        return this.nombre.getNombreTarea();
    }

    getCompletada(): boolean{
        return this.completada;
    }

    getIdNota(): string{
        return this.idNota.getIDNota();
    }

    static create(nombre: string, completada: boolean, idNota: string,id?: string): Either<Error,Tarea> {
        const nombreTarea = NombreTarea.create(nombre);
        if(nombreTarea.isRight()){
            return Either.makeRight<Error,Tarea>(new Tarea(nombreTarea.getRight(),completada,IdNota.create(idNota),IdTarea.create(id)));
        }
        else{
            return Either.makeLeft<Error,Tarea>(nombreTarea.getLeft());
        }
    }

}