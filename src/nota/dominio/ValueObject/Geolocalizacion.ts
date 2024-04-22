import { Either } from "src/utilidad/Either";

export class Geolocalizacion {
    private latitud: number;
    private longitud: number;

    private constructor(latitud: number, longitud: number) {
        this.latitud = latitud;
        this.longitud = longitud;
    }

    getLatitud(): number{
        return this.latitud;
    }

    getLongitud(): number{
        return this.longitud;
    }


    static create(latitud: number, longitud: number): Either<Error,Geolocalizacion> {
        return Either.makeRight<Error,Geolocalizacion>(new Geolocalizacion(latitud, longitud));
    }
}