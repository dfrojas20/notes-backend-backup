import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarNotasEtiquetaDto } from "./DataTransferObjects/BuscarNotasEtiquetaDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";

export class BuscarNotasPorEtiquetaService implements IApplicationService<BuscarNotasEtiquetaDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio;

    constructor(notaRepositorio: NotaRepositorio){
        this.notaRepositorio = notaRepositorio;
    }

    async execute(service: BuscarNotasEtiquetaDto): Promise<Either<Error,Iterable<Nota>>> {
        return await this.notaRepositorio.buscarNotasPorEtiqueta(service.idEtiqueta,service.idUsuario);
    }

}