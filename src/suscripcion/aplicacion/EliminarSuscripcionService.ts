import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { EliminarSuscripcionDto } from "./Dto/EliminarSuscripcionDto";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";

export class EliminarSuscripcionService implements IApplicationService<EliminarSuscripcionDto,string>{

    private readonly carpetaRepositorio: RepositorioSuscripcion

    constructor(susRepo: RepositorioSuscripcion) {
        this.carpetaRepositorio = susRepo;
    }

    async execute(service: EliminarSuscripcionDto): Promise<Either<Error,string>>{

        
        if(service){

            return await this.carpetaRepositorio.eliminarSuscripcion(service.idSuscripcion);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error con el Dto'));
        }

    }

    
}