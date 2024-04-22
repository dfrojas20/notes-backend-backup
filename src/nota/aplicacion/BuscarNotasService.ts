import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { NotaRepositorio } from "../dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Nota } from "../dominio/Nota";

export class BuscarNotasService implements IApplicationService<string,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio

    constructor(notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: string): Promise<Either<Error,Iterable<Nota>>>{

        console.log(service);
        return await this.notaRepositorio.buscarNotas();

    }

}