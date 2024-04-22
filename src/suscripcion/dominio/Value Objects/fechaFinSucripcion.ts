import { Either } from "src/utilidad/Either";

export class FechaFinSuscripcion {
    private fecha: Date;

    private constructor(fecha:Date) {
        this.fecha = fecha;
    }

    getFechaFinSuscripcion(): Date{
        return this.fecha;
    }

    static create(fecha:Date): Either<Error,FechaFinSuscripcion> {
        return Either.makeRight<Error,FechaFinSuscripcion>(new FechaFinSuscripcion(fecha));
    }
}