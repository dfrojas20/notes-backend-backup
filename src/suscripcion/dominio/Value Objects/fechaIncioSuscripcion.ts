import { Either } from "src/utilidad/Either";

export class FechaInicioSuscripcion {
    private fecha: Date;

    private constructor(fecha:Date) {
        this.fecha = fecha;
    }

    getFechaInicioSuscripcion(): Date{
        return this.fecha;
    }

    static create(fecha:Date): Either<Error,FechaInicioSuscripcion> {
        return Either.makeRight<Error,FechaInicioSuscripcion>(new FechaInicioSuscripcion(fecha));
    }
}