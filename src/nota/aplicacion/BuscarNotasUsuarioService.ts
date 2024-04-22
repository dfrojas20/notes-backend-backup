import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarNotasUsuarioDto } from "./DataTransferObjects/BuscarNotasUsuarioDto";
import { Nota } from "../dominio/Nota";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarNotasUsuarioService implements IApplicationService<BuscarNotasUsuarioDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio;

    constructor(notaRepositorio: NotaRepositorio){
        this.notaRepositorio = notaRepositorio;
    }

    async execute(service: BuscarNotasUsuarioDto): Promise<Either<Error,Iterable<Nota>>> {

        const result = await this.notaRepositorio.buscarNotasUsuario(service.idUsuario);
        return result;

    }

}