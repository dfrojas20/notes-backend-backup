import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarCarpetaIdDto } from "./DataTransferObjects/BuscarCarpetaIdDto";
import { Carpeta } from "../dominio/Carpeta";
import { Either } from "src/utilidad/Either";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";

export class BuscarCarpetaPorIdService implements IApplicationService<BuscarCarpetaIdDto,Carpeta>{

    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(carpetaRepo: CarpetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }
    
    async execute(service: BuscarCarpetaIdDto): Promise<Either<Error,Carpeta>>{
        
        return await this.carpetaRepositorio.buscarCarpeta(service.idCarpeta);

    }

}