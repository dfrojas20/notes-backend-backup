import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { RegistrarUsuarioDto } from "./DataTransferObject/RegistrarUsuarioDto";
import { Usuario } from "../dominio/Usuario";
import { UsuarioRepositorio } from "../dominio/UsuarioRepositorio";
import { Either } from "src/utilidad/Either";

export class RegistrarUsuarioService implements IApplicationService<RegistrarUsuarioDto,Usuario>{

    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepo: UsuarioRepositorio){
        this.usuarioRepositorio = usuarioRepo;
    }

    async execute(service: RegistrarUsuarioDto): Promise<Either<Error,Usuario>>{
        let usuario = Usuario.create(service.nombre,service.correo,service.clave,service.fechaNacimiento,service.suscripcion);

        if(usuario.isRight()){
            return await this.usuarioRepositorio.registrarUsuario(usuario.getRight());
        }
        else{
            return Either.makeLeft<Error,Usuario>(usuario.getLeft());
        }
    }

}