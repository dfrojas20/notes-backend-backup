import { Either } from "src/utilidad/Either";

export interface ILogger{
    log(mensaje: string, resultado: string, fecha: Date): Promise<Either<Error,string>>;
}