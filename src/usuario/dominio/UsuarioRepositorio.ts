import { Either } from "src/utilidad/Either";
import { Usuario } from "./Usuario";

export interface UsuarioRepositorio{
    registrarUsuario(usuario: Usuario): Promise<Either<Error,Usuario>>;
    buscarUsuarios(): Promise<Either<Error,Iterable<Usuario>>>;
    buscarUsuarioPorId(id:string): Promise<Either<Error,Usuario>>;
    buscarUsuarioPorCorreoClave(correo:string,clave:string): Promise<Either<Error,Usuario>>;
    modificarUsuario(usuario: Usuario): Promise<Either<Error,Usuario>>;
    eliminarUsuario(id:string): Promise<Either<Error,string>>;
}