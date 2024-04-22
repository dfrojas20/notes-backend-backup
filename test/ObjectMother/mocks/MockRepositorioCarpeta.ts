import { Carpeta } from "src/carpeta/dominio/Carpeta";
import { CarpetaRepositorio } from "src/carpeta/dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";
import { CrearCarpetaTest } from "../Carpeta/CrearCarpetaTest";

export class MockRepositorioCarpeta implements CarpetaRepositorio{
    async crearCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {
        if(carpeta.getNombre() == CrearCarpetaTest.CrearCarpetaTestValid().nombre){
            return Either.makeRight<Error,Carpeta>(carpeta);
        }
        else{
            return Either.makeLeft<Error,Carpeta>(new Error("Error al crear la carpeta"));
        }
    }
    buscarCarpetas(): Promise<Either<Error, Iterable<Carpeta>>> {
        throw new Error("Method not implemented.");
    }
    buscarCarpeta(id: string): Promise<Either<Error, Carpeta>> {
        throw new Error("Method not implemented.");
    }
    buscarCarpetasPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Carpeta>>> {
        throw new Error("Method not implemented.");
    }
    modificarCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {
        throw new Error("Method not implemented.");
    }
    eliminarCarpeta(id: string): Promise<Either<Error, string>> {
        throw new Error("Method not implemented.");
    }

    async 

}