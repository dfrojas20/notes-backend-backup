import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Carpeta } from "../dominio/Carpeta";
import { CrearCarpetaDto } from "./DataTransferObjects/CrearCarpetaDto";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";

export class CrearCarpetaService implements IApplicationService<CrearCarpetaDto,Carpeta>{
    
    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(carpetaRepo: CarpetaRepositorio){
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: CrearCarpetaDto): Promise<Either<Error,Carpeta>>{   
        let carpeta = Carpeta.create(service.nombre,service.predeterminada,service.idUsuario);

        if(carpeta.isRight()){
            console.log("entro");
            return await this.carpetaRepositorio.crearCarpeta(carpeta.getRight());
        }
        else{
            return Either.makeLeft<Error,Carpeta>(carpeta.getLeft());
        }
    }

}