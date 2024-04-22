import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { BuscarSuscripcionUsuarioDto } from "./Dto/BuscarSuscripcionusuarioDto";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";
import { Suscripcion } from "../dominio/suscripcion";

export class BuscarSuscripcionUsuarioService implements IApplicationService<BuscarSuscripcionUsuarioDto,Iterable<Suscripcion>>{

    private readonly carpetaRepositorio: RepositorioSuscripcion;

    constructor(suscripcionRepo: RepositorioSuscripcion) {
        this.carpetaRepositorio = suscripcionRepo;
    }

    async execute(service: BuscarSuscripcionUsuarioDto): Promise<Either<Error,Iterable<Suscripcion>>>{
                
            console.log(service);
            return await this.carpetaRepositorio.buscarSuscripcionPorUsuario(service.idUsuario);
    }

}