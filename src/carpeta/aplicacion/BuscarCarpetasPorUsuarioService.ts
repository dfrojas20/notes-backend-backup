import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarCarpetasUsuarioDto } from "./DataTransferObjects/BuscarCarpetasUsuarioDto";
import { Carpeta } from "../dominio/Carpeta";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarCarpetasPorUsuarioService implements IApplicationService<BuscarCarpetasUsuarioDto,Iterable<Carpeta>>{

    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(carpetaRepo: CarpetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: BuscarCarpetasUsuarioDto): Promise<Either<Error,Iterable<Carpeta>>>{
                
            console.log(service);
            return await this.carpetaRepositorio.buscarCarpetasPorUsuario(service.idUsuario);
    }

}