import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { Nota } from "./Nota";
import { Either} from "src/utilidad/Either"
import { Tarea } from "./Tarea";

export interface NotaRepositorio{

    crearNota(nota: Nota): Promise<Either<Error,Nota>>;
    buscarNotas(): Promise<Either<Error,Iterable<Nota>>>;
    modificarNota(nota: Nota): Promise<Either<Error,Nota>>;
    eliminarNota(id:string): Promise<Either<Error,string>>;
    buscarNota(id:string): Promise<Either<Error,Nota>>;
    buscarNotasPorCarpeta(idCarpeta:string): Promise<Either<Error,Iterable<Nota>>>;
    buscarNotasEliminadasUsuario(idUsuario:string): Promise<Either<Error,Iterable<Nota>>>;
    buscarNotasUsuario(idUsuario:string): Promise<Either<Error,Iterable<Nota>>>;
    buscarNotasPorPalabraClave(palabraClave:string,idUsuario: string): Promise<Either<Error,Iterable<Nota>>>;
    buscarNotasPorEtiqueta(idEtiqueta:string,idUsuario: string): Promise<Either<Error,Iterable<Nota>>>;
    buscarNotasPorGeolocalizacion(latitud:number,longitud:number,idUsuario: string): Promise<Either<Error,Iterable<Nota>>>;

}