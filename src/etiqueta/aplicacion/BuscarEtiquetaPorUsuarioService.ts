import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { BuscarEtiquetaPorUsuarioDto } from "./Dto/BuscarEtiquetaPorUsuarioDto";
import { Etiqueta } from "../dominio/etiqueta";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";

export class BuscarEtiquetasPorUsuarioService implements IApplicationService<BuscarEtiquetaPorUsuarioDto,Iterable<Etiqueta>>{

    private readonly carpetaRepositorio: EtiquetaRepositorio;

    constructor( etiquetaRepo: EtiquetaRepositorio) {
        this.carpetaRepositorio = etiquetaRepo;
    }

    async execute(service: BuscarEtiquetaPorUsuarioDto): Promise<Either<Error,Iterable<Etiqueta>>>{
                
            console.log(service);
            return await this.carpetaRepositorio.buscarEtiquetasPorUsuario(service.idUsuario);
    }

}