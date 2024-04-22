import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { CrearNotaDto } from "src/nota/aplicacion/DataTransferObjects/CrearNotaDto";
import { Either } from "src/utilidad/Either";
import { Nota } from "src/nota/dominio/Nota";

export class CrearNotaService implements IApplicationService<CrearNotaDto,Nota>{

    private readonly notaRepositorio: NotaRepositorio
    

    constructor(notaRepo: NotaRepositorio) {
        this.notaRepositorio = notaRepo;
    }

    async execute(service: CrearNotaDto): Promise<Either<Error,Nota>>{


        let nota = Nota.create(service.fechaCreacion, service.fechaModificacion, service.estado, 
            service.titulo, service.cuerpo, service.idCarpeta,service.longitud, service.latitud,service.etiquetas);
        
        if(nota.isRight()){

            if(service.tareas){
                if(service.tareas.length > 0){
                    for(let tar of service.tareas){
                        let tarea = Nota.createTarea(tar.nombreTarea, tar.completada, nota.getRight().getId());
                        if(tarea.isRight()){
                            nota.getRight().agregarTarea(tarea.getRight());
                        }
                        else{
                            return Either.makeLeft<Error,Nota>(tarea.getLeft());
                        }
                    }
                }
            }

            const notaC = await this.notaRepositorio.crearNota(nota.getRight());
            console.log("app nota c",notaC)
            return notaC;
            

        }
        else{
            return Either.makeLeft<Error,Nota>(nota.getLeft());
        }

    }
}