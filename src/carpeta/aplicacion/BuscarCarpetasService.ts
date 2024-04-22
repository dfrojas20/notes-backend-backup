import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Carpeta } from "../dominio/Carpeta";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarCarpetasService implements IApplicationService<string,Iterable<Carpeta>>{

    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(carpetaRepo: CarpetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: string): Promise<Either<Error,Iterable<Carpeta>>>{
            
        console.log(service);
        return await this.carpetaRepositorio.buscarCarpetas();

    }

}