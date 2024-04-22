import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ILogger } from "../aplicacion/ILogger";
import { LogEntity } from "./LogEntity";
import { Either } from "src/utilidad/Either";
import { v4 as uuidv4 } from 'uuid';

export class LoggerImplementation implements ILogger{

    constructor(@InjectRepository(LogEntity) private readonly logRepositorio: Repository<LogEntity>){}

    async log(mensaje: string, resultado:string, fecha: Date): Promise<Either<Error,string>>{
        let loggeando: LogEntity ={
            id: uuidv4(),
            mensaje: mensaje,
            resultado: resultado,
            fecha: fecha
        };

        try{
            const result = await this.logRepositorio.save(loggeando);
            return Either.makeRight<Error,string>(result.mensaje);
        }
        catch(error){
            return Either.makeLeft<Error,string>(new Error('Error al registrar log'));
        }
    }

}


