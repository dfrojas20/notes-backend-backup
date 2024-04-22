import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Suscripcion } from "../dominio/suscripcion";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";
import { BuscarSuscripcionDto } from "./Dto/BuscarSuscripcionesDto";

export class BuscarSuscripcionPorId implements IApplicationService<BuscarSuscripcionDto,Suscripcion>{

    private readonly suscripcionRepositorio: RepositorioSuscripcion;

    constructor(suscripcionRepo: RepositorioSuscripcion) {
        this.suscripcionRepositorio = suscripcionRepo;
    }
    
    async execute(service: BuscarSuscripcionDto): Promise<Either<Error,Suscripcion>>{
        
        return await this.suscripcionRepositorio.buscarSuscripcion(service.idSuscripcion);

    }

}