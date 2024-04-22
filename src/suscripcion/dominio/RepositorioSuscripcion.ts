import { Either} from "src/utilidad/Either"
import { Suscripcion } from "./suscripcion";

export interface RepositorioSuscripcion{

    crearSuscripcion(nota: Suscripcion): Promise<Either<Error,Suscripcion>>;
    buscarSuscripciones(): Promise<Either<Error,Iterable<Suscripcion>>>;
    modificarSuscripcion(nota: Suscripcion): Promise<Either<Error,Suscripcion>>;
    eliminarSuscripcion(id:string): Promise<Either<Error,string>>;
    buscarSuscripcion(id:string): Promise<Either<Error,Suscripcion>>;
    buscarSuscripcionPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Suscripcion>>>;
}