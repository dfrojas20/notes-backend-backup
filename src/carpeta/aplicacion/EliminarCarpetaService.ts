import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";
import { BorrarCarpetaDto } from "./DataTransferObjects/BorrarCarpetaDto";

export class EliminarCarpetaService implements IApplicationService<BorrarCarpetaDto,string>{

    private readonly carpetaRepositorio: CarpetaRepositorio

    constructor(notaRepo: CarpetaRepositorio) {
        this.carpetaRepositorio = notaRepo;
    }

    async execute(service: BorrarCarpetaDto): Promise<Either<Error,string>>{

        
        if(service){

            return await this.carpetaRepositorio.eliminarCarpeta(service.idCarpeta);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error con el Dto'));
        }

    }

    
}