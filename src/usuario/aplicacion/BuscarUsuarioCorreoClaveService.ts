import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarUsuarioCorreoClaveDto } from "./DataTransferObject/BuscarUsuarioCorreoClaveDto";
import { Usuario } from "../dominio/Usuario";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";
import { Either } from "src/utilidad/Either";

export class BuscarUsuarioCorreoClaveService implements IApplicationService<BuscarUsuarioCorreoClaveDto,Usuario>{
    private readonly usuarioRepositorio: UsuarioRepositorio;
    
    constructor(usuarioRepo: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: BuscarUsuarioCorreoClaveDto): Promise<Either<Error,Usuario>>{
        return await this.usuarioRepositorio.buscarUsuarioPorCorreoClave(service.correo,service.clave);
    }

}