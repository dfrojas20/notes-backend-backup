import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Etiqueta } from "../dominio/etiqueta";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";

export class BuscarEtiquetasService implements IApplicationService<string,Etiqueta[]>{

    private readonly carpetaRepositorio: EtiquetaRepositorio;

    constructor(carpetaRepo: EtiquetaRepositorio) {
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: string): Promise<Either<Error,Etiqueta[]>>{
            
        console.log(service);
        return await this.carpetaRepositorio.buscarEtiquetas();

    }

}