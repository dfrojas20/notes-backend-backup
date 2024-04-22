import { Either } from "src/utilidad/Either";
import { Etiqueta } from "./etiqueta";


export interface EtiquetaRepositorio {
    guardarEriqueta(etiqueta: Etiqueta): Promise<Either<Error,Etiqueta>> ;
    modificarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error,Etiqueta>>
    buscarEtiqueta(id: string): Promise<Either<Error,Etiqueta>>
    buscarEtiquetas(): Promise<Either<Error,Etiqueta[]>>
    eliminarEtiqueta(id: string): Promise<Either<Error,string>>
    buscarEtiquetasPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Etiqueta>>>;
}