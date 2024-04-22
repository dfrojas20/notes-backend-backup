import e from "express";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "src/nota/aplicacion/DataTransferObjects/CrearNotaDto";
import { EstadoNota } from "src/nota/dominio/ValueObject/EstadoNota";
import { mockRepositorioNota } from "../mocks/mockNota";



export class crearNotatest {
    public static crearNotaTestValid():CrearNotaDto {
        let nota = new CrearNotaDto();
        nota.fechaCreacion = new Date();
        nota.fechaModificacion = new Date();
        nota.estado = EstadoNota.Pendiente;
        nota.titulo = "Nota de prueba";
        nota.cuerpo = "Cuerpo de la nota de prueba";
        nota.idCarpeta = "1";
        nota.etiquetas = ["etiqueta1","etiqueta2"];
        nota.latitud = 1.1;
        nota.longitud = 1.1;
        return nota;
    }

    public static crearNotaTestNoValid():CrearNotaDto {
        let nota = new CrearNotaDto();
        nota.fechaCreacion = new Date();
        nota.fechaModificacion = new Date();
        nota.estado = EstadoNota.Pendiente;
        nota.titulo = "";
        nota.cuerpo = "Cuerpo de la nota de prueba";
        nota.idCarpeta = "1";
        return nota;
    }

    public static crearNotaService():CrearNotaService {

        const mock: mockRepositorioNota = new mockRepositorioNota(); 
        
        return new CrearNotaService(mock);
    } 
}