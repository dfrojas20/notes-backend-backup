import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { crearNotatest } from "../Nota/crearNotaTest";

export class mockRepositorioNota implements NotaRepositorio {
    async crearNota(nota: Nota): Promise<Either<Error, Nota>> {
      if (nota.getTitulo() == crearNotatest.crearNotaTestValid().titulo) {
        return Either.makeRight<Error, Nota>(nota);
      } else {
        return Either.makeLeft<Error, Nota>(new Error('Error al crear la nota'));
      }
      
    }

    async buscarNotas(): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async modificarNota(nota: Nota): Promise<Either<Error, Nota>> {
        throw new Error("Method not implemented.");
        }
    async eliminarNota(id: string): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
        }
    async buscarNota(id: string): Promise<Either<Error, Nota>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasPorCarpeta(idCarpeta: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasEliminadasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasPorPalabraClave(palabraClave: string, idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasPorEtiqueta(idEtiqueta: string, idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }
    async buscarNotasPorGeolocalizacion(latitud: number, longitud: number, idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        throw new Error("Method not implemented.");
        }

}    

