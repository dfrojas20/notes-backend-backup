import { Either } from "src/utilidad/Either";

export class FechaCreacionNota {
    private fecha: Date;

    private constructor(fecha: Date) {
        this.fecha = fecha;
    }

    getFechaCreacion(): Date{
        return this.fecha;
    }

    static create(fecha: Date): Either<Error,FechaCreacionNota> {
        return Either.makeRight<Error,FechaCreacionNota>(new FechaCreacionNota(fecha));
    }

}