import { Either } from "src/utilidad/Either";
import { IdSuscripcion } from "./Value Objects/IdSuscripcion";
import { EstadoSuscripcion } from "./Value Objects/estadoSuscripcion";
import { FechaInicioSuscripcion } from "./Value Objects/fechaIncioSuscripcion";
import { FechaFinSuscripcion } from "./Value Objects/fechaFinSucripcion";
import { IdUsuario } from "src/usuario/dominio/ValueObject/IdUsuario";

export class Suscripcion{

    private id: IdSuscripcion;
    private fechaInicio: FechaInicioSuscripcion;
    private fechaFin: FechaFinSuscripcion;
    private estado: EstadoSuscripcion;
    private idUsuario: IdUsuario;

    private constructor(fechaInicio: FechaInicioSuscripcion, fechaFin: FechaFinSuscripcion, estado: EstadoSuscripcion,idUsuario:IdUsuario,id?: IdSuscripcion){
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado; 
        this.idUsuario = idUsuario;  
    }

    public getId(): string{
        return this.id.getIdSuscricion();
    }

    public getFechaInicio(): Date{
        return this.fechaInicio.getFechaInicioSuscripcion();
    }

    public getUuario(): string{
        return this.idUsuario.getIDUsuario();

    }

    public getFechFin(): Date{
        return this.fechaFin.getFechaFinSuscripcion();
    }

    public getEstado(): string{
        return this.estado.toString();
    }

    static create(fechaInicio: Date, fechaFin: Date, estado: string,idUsuario:string,id?: string ): Either<Error,Suscripcion>{
        
    
        let auxiliarEstado: EstadoSuscripcion;

        switch(estado.trim().toLowerCase()){
            case "activa":
            auxiliarEstado = EstadoSuscripcion.Activa;
            break;
            case "inactiva":
            auxiliarEstado = EstadoSuscripcion.Inactiva;
            break;
        }
            
        let auxiliarFechaInicio = FechaInicioSuscripcion.create(fechaInicio);
        if(auxiliarFechaInicio.isLeft()){
            return Either.makeLeft<Error,Suscripcion>(auxiliarFechaInicio.getLeft());
        }
        else{
            let auxiliarFechaFin = FechaFinSuscripcion.create(fechaFin);
            if(auxiliarFechaFin.isLeft()){
                return Either.makeLeft<Error,Suscripcion>(auxiliarFechaFin.getLeft());
            }
            console.log("dom",IdUsuario.create(idUsuario))
            console.log("dom",IdSuscripcion.create(id))
                return Either.makeRight<Error,Suscripcion>(new Suscripcion(auxiliarFechaInicio.getRight(),auxiliarFechaFin.getRight(),auxiliarEstado,IdUsuario.create(idUsuario),IdSuscripcion.create(id)));
                        
            }
        }
    }