import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Carpeta } from "../dominio/Carpeta";
import { ModificarCarpetaDto } from "./DataTransferObjects/ModificarCarpetaDto";
import { CarpetaRepositorio } from "../dominio/CarpetaRepositorio";
import { Either } from "src/utilidad/Either";

export class ModificarCarpetaService implements IApplicationService<ModificarCarpetaDto,Carpeta>{
    
    private readonly carpetaRepositorio: CarpetaRepositorio;

    constructor(carpetaRepo: CarpetaRepositorio){
        this.carpetaRepositorio = carpetaRepo;
    }

    async execute(service: ModificarCarpetaDto): Promise<Either<Error,Carpeta>>{   
        let carpeta = Carpeta.create(service.nombre,service.predeterminada,service.idUsuario,service.idCarpeta);

        if(carpeta.isRight()){
            return await this.carpetaRepositorio.modificarCarpeta(carpeta.getRight());
        }
        else{
            return Either.makeLeft<Error,Carpeta>(carpeta.getLeft());
        }
    }

}