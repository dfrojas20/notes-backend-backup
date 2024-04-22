import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarNotasPalabraClaveDto } from "./DataTransferObjects/BuscarNotasPalabraClaveDto";
import { Nota } from "../dominio/Nota";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarNotasPorPalabraClaveService implements IApplicationService<BuscarNotasPalabraClaveDto,Iterable<Nota>>{
    
    private readonly notaRepositorio: NotaRepositorio;

    constructor(notaRepositorio: NotaRepositorio){
        this.notaRepositorio = notaRepositorio;
    }

    async execute(service: BuscarNotasPalabraClaveDto): Promise<Either<Error,Iterable<Nota>>> {
        return await this.notaRepositorio.buscarNotasPorPalabraClave(service.palabraClave,service.idUsuario);
    }

}