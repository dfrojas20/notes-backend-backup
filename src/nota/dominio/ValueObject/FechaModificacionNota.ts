import { Either } from "src/utilidad/Either";

export class FechaModificacionNota {
    private fecha: Date;

    private constructor(fecha:Date) {
        this.fecha = fecha;
    }

    getFechaModificacionNota(): Date{
        return this.fecha;
    }

    static create(fecha:Date): Either<Error,FechaModificacionNota> {
        return Either.makeRight<Error,FechaModificacionNota>(new FechaModificacionNota(fecha));
    }
}