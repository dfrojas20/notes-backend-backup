import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarNotasEliminadasUsuarioDto } from "./DataTransferObjects/BuscarNotasEliminadasUsuarioDto";
import { Nota } from "../dominio/Nota";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarNotasEliminadasUsuarioService implements IApplicationService<BuscarNotasEliminadasUsuarioDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio;

    constructor(notaRepo: NotaRepositorio){
        this.notaRepositorio = notaRepo;
    }

    async execute(service: BuscarNotasEliminadasUsuarioDto): Promise<Either<Error,Iterable<Nota>>>{
        return await this.notaRepositorio.buscarNotasEliminadasUsuario(service.idUsuario);
    }

}