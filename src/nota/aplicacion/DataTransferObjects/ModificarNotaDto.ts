import { EstadoNota } from "src/nota/dominio/ValueObject/EstadoNota";
import { CrearTareaDto } from "./CrearTareaDto";


export class ModificarNotaDto {
    idNota : string;
    fechaModificacion: Date;
    fechaCreacion: Date;
    estado: EstadoNota;
    titulo: string;
    cuerpo: string;
    longitud?: number;
    latitud?: number;
    idCarpeta: string;
    etiquetas?:string[];
    tareas?: CrearTareaDto[];
}