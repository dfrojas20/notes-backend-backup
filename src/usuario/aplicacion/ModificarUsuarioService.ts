import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { Usuario } from "../dominio/Usuario";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";
import { ModificarUsuarioDto } from "./DataTransferObject/ModificarUsuarioDto";

export class ModificarUsuarioService implements IApplicationService<ModificarUsuarioDto,Usuario>{
    
    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepo: UsuarioRepositorio){
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: ModificarUsuarioDto): Promise<Either<Error,Usuario>>{
        let usuario = Usuario.create(service.nombre,service.correo,service.clave,service.fechaNacimiento,service.suscripcion,service.idUsuario);

        if(usuario.isRight()){
            return await this.usuarioRepositorio.modificarUsuario(usuario.getRight());
        }
        else{
            return Either.makeLeft<Error,Usuario>(usuario.getLeft());
        }
    }

}