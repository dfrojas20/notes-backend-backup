import { IdNota } from "./ValueObject/IdNota";
import { TituloNota } from "./ValueObject/TituloNota";
import { CuerpoNota } from "./ValueObject/CuerpoNota";
import { FechaCreacionNota } from "./ValueObject/FechaCreacionNota";
import { FechaModificacionNota } from "./ValueObject/FechaModificacionNota";
import { EstadoNota } from "./ValueObject/EstadoNota";
import { Geolocalizacion } from "./ValueObject/Geolocalizacion";
import { Either } from "src/utilidad/Either";
import { IdCarpeta } from "src/carpeta/dominio/ValueObject/IdCarpeta";
import { Optional } from "src/utilidad/Optional";
import { idEtiqueta } from "src/etiqueta/dominio/ValueObject/idEtiqueta";
import { Tarea } from "./Tarea";

export class Nota{

    private id: IdNota;
    private titulo: TituloNota;
    private cuerpo: CuerpoNota;
    private fechaCreacion: FechaCreacionNota;
    private fechaModificacion: FechaModificacionNota;
    private estado: EstadoNota;
    private geolocalizacion: Optional<Geolocalizacion>;
    private idCarpeta: IdCarpeta;
    private etiquetas: idEtiqueta[];
    private tareas: Tarea[];

    private constructor(fechaCreacion: FechaCreacionNota, fechaModificacion: FechaModificacionNota, estado: EstadoNota, titulo: TituloNota, cuerpo: CuerpoNota,geolocalizacion: Optional<Geolocalizacion>, idCarpeta: IdCarpeta, etiquetas?:idEtiqueta[],id?: IdNota){
        this.id = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estado = estado;
        this.geolocalizacion = geolocalizacion;
        this.idCarpeta = idCarpeta;
        this.etiquetas=etiquetas
        this.tareas = [];
    }

    public getId(): string{
        return this.id.getIDNota();
    }


    public getIdCarpeta(): string{
        return this.idCarpeta.getIDCarpeta();
    }

    public getTitulo(): string{
        return this.titulo.getTituloNota();
    }

    public getCuerpo(): string{
        return this.cuerpo.getCuerpoNota();
    }

    public getFechaCreacion(): Date{
        return this.fechaCreacion.getFechaCreacion();
    }

    public getFechaModificacion(): Date{
        return this.fechaModificacion.getFechaModificacionNota();
    }

    public getEstado(): string{
        return this.estado.toString();
    }

    public getLatitud(){
        if(this.geolocalizacion.hasvalue()){
            return this.geolocalizacion.getValue().getLatitud();
        }
        else{
            return undefined;
        }
    }

    
    public getLongitud(){
        if(this.geolocalizacion.hasvalue()){
            return this.geolocalizacion.getValue().getLongitud();
        }
        else{
            return undefined;
        }
    }

    public getEtiquetas(): string[]{
        return this.etiquetas.map((etiqueta) => etiqueta.getIDEtiqueta())
    }

    public getTareas(): Tarea[]{
        return this.tareas;
    }

    public agregarTarea(tarea: Tarea){
        this.tareas.push(tarea);
    }

    static createTarea(nombre: string, completada: boolean, idNota: string,id?: string): Either<Error,Tarea> {
       return Tarea.create(nombre,completada,idNota,id);
    }

    static create(fechaCreacion: Date, fechaModificacion: Date, estado: string, titulo: string, cuerpo: string, idCarpeta: string, longitud?: number, latitud?: number, etiqueta?:string[],id?: string ): Either<Error,Nota>{
        
        let auxiliarEstado: EstadoNota;

        if(!idCarpeta || idCarpeta.length == 0){
            return Either.makeLeft<Error,Nota>(new Error("No se puede crear una nota sin carpeta"));
        }

        switch(estado.trim().toLowerCase()){
            case "pendienteporguardar":
            auxiliarEstado = EstadoNota.Pendiente;
            break;
            case "guardada":
            auxiliarEstado = EstadoNota.Guardada;
            break;
            case "eliminada":
            auxiliarEstado = EstadoNota.Eliminada;
            break;
            default:
            auxiliarEstado = EstadoNota.Pendiente;
            break;

        }

        console.log("dominio etiquetas",etiqueta)
        let etiquetass: idEtiqueta[]=[];
        console.log("dom",Array.isArray(etiqueta))
            if (Array.isArray(etiqueta)) {
                etiquetass = etiqueta.map((etiq) => idEtiqueta.create(etiq));
                console.log("aqui1",etiquetass)
            } else {
                console.log("aqui2")
                etiquetass = [idEtiqueta.create(etiqueta)];
                console.log("aqui2",etiquetass)
            } 

            


        let auxiliarFechaCreacion = FechaCreacionNota.create(fechaCreacion);
        if(auxiliarFechaCreacion.isLeft()){
            return Either.makeLeft<Error,Nota>(auxiliarFechaCreacion.getLeft());
        }
        else{
            let auxiliarFechaModificacion = FechaModificacionNota.create(fechaModificacion);
            if(auxiliarFechaModificacion.isLeft()){
                return Either.makeLeft<Error,Nota>(auxiliarFechaModificacion.getLeft());
            }
            else{
                let auxiliarTitulo = TituloNota.create(titulo);
                if(auxiliarTitulo.isLeft()){
                    return Either.makeLeft<Error,Nota>(auxiliarTitulo.getLeft());
                }
                else{
                    let auxiliarCuerpo = CuerpoNota.create(cuerpo);
                    if(auxiliarCuerpo.isLeft()){
                        return Either.makeLeft<Error,Nota>(auxiliarCuerpo.getLeft());
                    }
                    else{
                        let auxiliarGeolocalizacion: Optional<Geolocalizacion>;
                        if(latitud && longitud){
                            let auxiliarGeolocalizacion2 = Geolocalizacion.create(latitud,longitud);
                            if(auxiliarGeolocalizacion2.isLeft()){
                                return Either.makeLeft<Error,Nota>(auxiliarGeolocalizacion2.getLeft());
                            }
                            else{
                                auxiliarGeolocalizacion = new Optional<Geolocalizacion>(auxiliarGeolocalizacion2.getRight());
                            }
                        }
                        else{
                            auxiliarGeolocalizacion = new Optional<Geolocalizacion>();
                        }
                        
                        return Either.makeRight<Error,Nota>(new Nota(auxiliarFechaCreacion.getRight(),auxiliarFechaModificacion.getRight(),auxiliarEstado,auxiliarTitulo.getRight(),auxiliarCuerpo.getRight(),auxiliarGeolocalizacion,IdCarpeta.create(idCarpeta),etiquetass,IdNota.create(id)));
                        
                    }
                }
            }
        }
            
    }

}