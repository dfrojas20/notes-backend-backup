import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { EliminarUsuarioDto } from "./DataTransferObject/EliminarUsuarioDto";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";
import { Either } from "src/utilidad/Either";

export class EliminarUsuarioService implements IApplicationService<EliminarUsuarioDto,string>{

    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepositorio: UsuarioRepositorio){
        this.usuarioRepositorio = usuarioRepositorio;
    }

    async execute(service: EliminarUsuarioDto): Promise<Either<Error,string>> {
        
        const result = await this.usuarioRepositorio.eliminarUsuario(service.idUsuario);
        return result;

    }

}