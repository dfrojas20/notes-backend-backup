import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Suscripcion } from "../dominio/suscripcion";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";

export class BuscarSuscripcionesService implements IApplicationService<string,Iterable<Suscripcion>>{

    private readonly suscripcionRepositorio: RepositorioSuscripcion;

    constructor(suscripcionRepo: RepositorioSuscripcion) {
        this.suscripcionRepositorio = suscripcionRepo;
    }

    async execute(service: string): Promise<Either<Error,Iterable<Suscripcion>>>{
            
        console.log(service);
        return await this.suscripcionRepositorio.buscarSuscripciones();

    }

}