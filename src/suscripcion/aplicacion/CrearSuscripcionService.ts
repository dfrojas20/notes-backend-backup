import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { Either } from "src/utilidad/Either";
import { CrearSuscripcionDto } from "./Dto/CrearSuscipcionDto";
import { RepositorioSuscripcion } from "../dominio/RepositorioSuscripcion";
import { Suscripcion } from "../dominio/suscripcion";
import { addDays } from 'date-fns';

export class CrearSuscripcionService implements IApplicationService<CrearSuscripcionDto,Suscripcion>{

    private readonly usuarioRepositorio: RepositorioSuscripcion;
    

    constructor(suscripcionRepo: RepositorioSuscripcion){
        this.usuarioRepositorio = suscripcionRepo;
    }

    async execute(service: CrearSuscripcionDto): Promise<Either<Error,Suscripcion>>{
        const today = new Date();
        const nextMonth = addDays(today, 30);
        let suscripcion = Suscripcion.create(today,nextMonth,"Activa",service.idUsuario);

        if(suscripcion.isRight()){
            return await this.usuarioRepositorio.crearSuscripcion(suscripcion.getRight());
        }
        else{
            return Either.makeLeft<Error,Suscripcion>(suscripcion.getLeft());
        }
    }

}