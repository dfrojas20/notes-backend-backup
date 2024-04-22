import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Nota } from "../dominio/Nota";
import { BuscarNotasCarpetaDto } from "./DataTransferObjects/BuscarNotasCarpetaDto";

export class BuscarNotasCarpetaService implements IApplicationService<BuscarNotasCarpetaDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BuscarNotasCarpetaDto): Promise<Either<Error,Iterable<Nota>>>{
        console.log(service.idCarpeta)
        return await this.notaRepositorio.buscarNotasPorCarpeta(service.idCarpeta);

    }

    
}