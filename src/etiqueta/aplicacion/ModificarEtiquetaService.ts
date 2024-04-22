import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { EtiquetaRepositorio } from "../dominio/EtiquetaRepositorio";
import { Etiqueta } from "../dominio/etiqueta";
import { ModificarEtiquetaDto } from "./Dto/ModificarEtiquetaDto";

export class ModificarEtiquetaService implements IApplicationService<ModificarEtiquetaDto,Etiqueta>{
    
    private readonly etiquetaRepositorio: EtiquetaRepositorio;

    constructor(carpetaRepo: EtiquetaRepositorio){
        this.etiquetaRepositorio = carpetaRepo;
    }

    async execute(service: ModificarEtiquetaDto): Promise<Either<Error,Etiqueta>>{   
        let etiqueta = Etiqueta.create(service.nombreEtiqueta,service.idUsuario,service.idEtiqueta);

        if(etiqueta.isRight()){
            return await this.etiquetaRepositorio.modificarEtiqueta(etiqueta.getRight());
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(etiqueta.getLeft());
        }
    }

}