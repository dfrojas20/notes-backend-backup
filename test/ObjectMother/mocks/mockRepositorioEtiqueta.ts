import { EtiquetaRepositorio } from "src/etiqueta/dominio/EtiquetaRepositorio";
import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { Either } from "src/utilidad/Either";


export class MockRepositorioEtiqueta implements EtiquetaRepositorio{
    guardarEriqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {
        throw new Error("Method not implemented.");
    }
    async buscarEtiquetas(): Promise<Either<Error, Etiqueta[]>> {
        throw new Error("Method not implemented.");
    }
    async buscarEtiqueta(id: string): Promise<Either<Error, Etiqueta>> {
        throw new Error("Method not implemented.");
    }
    async buscarEtiquetasPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Etiqueta>>> {
        throw new Error("Method not implemented.");
    }
    async modificarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {
        throw new Error("Method not implemented.");
    }
    async eliminarEtiqueta(id: string): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }

}