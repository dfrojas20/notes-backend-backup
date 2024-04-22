import { IApplicationService } from "src/core/aplicacion/IApplicationService";
import { BuscarNotasGeolocalizacionDto } from "./DataTransferObjects/BuscarNotasGeolocalizacionDto";
import { Nota } from "../dominio/Nota";
import { Either } from "src/utilidad/Either";
import { NotaRepositorio } from "../dominio/NotaRepositorio";

export class BuscarNotasPorGeolocalizacionService implements IApplicationService<BuscarNotasGeolocalizacionDto,Iterable<Nota>>{

    private readonly notaRepositorio: NotaRepositorio;

    constructor(notaRepositorio: NotaRepositorio){
        this.notaRepositorio = notaRepositorio;
    }

    async execute(service: BuscarNotasGeolocalizacionDto): Promise<Either<Error,Iterable<Nota>>> {
        return await this.notaRepositorio.buscarNotasPorGeolocalizacion(service.latitud,service.longitud,service.idUsuario);
    }

}