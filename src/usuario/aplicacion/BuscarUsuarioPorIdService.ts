import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarUsuarioIdDto } from "./DataTransferObject/BuscarUsuarioIdDto";
import { Usuario } from "../dominio/Usuario";
import { Either } from "src/utilidad/Either";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";

export class BuscarUsuarioPorIdService implements IApplicationService<BuscarUsuarioIdDto,Usuario>{

    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepo: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: BuscarUsuarioIdDto): Promise<Either<Error,Usuario>>{
            
        return await this.usuarioRepositorio.buscarUsuarioPorId(service.idUsuario);

    }
    
}