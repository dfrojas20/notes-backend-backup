import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "../../aplicacion/DataTransferObjects/CrearNotaDto";
import { ModificarNotaDto } from "../../aplicacion/DataTransferObjects/ModificarNotaDto";
import { ModificarNotaService } from "src/nota/aplicacion/ModificarNotaService";
import { EliminarNotaService } from "src/nota/aplicacion/EliminarNotaService";
import { BorraNotaDto } from "../../aplicacion/DataTransferObjects/BorrarNotaDto";
import { BuscarNotasService } from "src/nota/aplicacion/BuscarNotasService";
import { BuscarNotaPorIdService } from "src/nota/aplicacion/BuscarNotaPorIdService";
import { BuscarNotaIdDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotaIdDto";
import { BuscarNotasCarpetaDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasCarpetaDto";
import { BuscarNotasCarpetaService } from "src/nota/aplicacion/BuscarNotasCarpetaService";
import { BuscarNotasEliminadasUsuarioService } from "src/nota/aplicacion/BuscarNotasEliminadasUsuarioService";
import { BuscarNotasEliminadasUsuarioDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasEliminadasUsuarioDto";
import { NotaRepositorioAdaptador } from "../Repositorio/NotaRepositorioAdaptador";
import { BuscarNotasUsuarioDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasUsuarioDto";
import { BuscarNotasUsuarioService } from "src/nota/aplicacion/BuscarNotasUsuarioService";
import { BuscarNotasPorPalabraClaveService } from "src/nota/aplicacion/BuscarNotasPorPalabraClaveService";
import { BuscarNotasPalabraClaveDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasPalabraClaveDto";
import { BuscarNotasPorEtiquetaService } from "src/nota/aplicacion/BuscarNotasPorEtiquetaService";
import { BuscarNotasEtiquetaDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasEtiquetaDto";
import { BuscarNotasGeolocalizacionDto } from "src/nota/aplicacion/DataTransferObjects/BuscarNotasGeolocalizacionDto";
import { BuscarNotasPorGeolocalizacionService } from "src/nota/aplicacion/BuscarNotasPorGeolocalizacionService";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";

@Controller('nota')
export class NotaController {

    constructor(private crearNotaService: CrearNotaService,
        private modificarNota: ModificarNotaService,
        private eliminarNota: EliminarNotaService,
        private buscarNotas: BuscarNotasService,
        private buscarNotaId: BuscarNotaPorIdService,
        private buscarNotasCarpeta: BuscarNotasCarpetaService,
        private buscarEliminadas: BuscarNotasEliminadasUsuarioService,
        private buscarNotasUsuario: BuscarNotasUsuarioService,
        private buscarPalabraClave: BuscarNotasPorPalabraClaveService,
        private buscarEtiqueta: BuscarNotasPorEtiquetaService,
        private buscarGeolocalizacion: BuscarNotasPorGeolocalizacionService,
        private readonly notaRepositorio: NotaRepositorioAdaptador,
        private readonly logRepositorio: LoggerImplementation) {
            this.crearNotaService = new CrearNotaService(this.notaRepositorio);
            this.modificarNota = new ModificarNotaService(this.notaRepositorio);
            this.eliminarNota = new EliminarNotaService(this.notaRepositorio);
            this.buscarNotas = new BuscarNotasService(this.notaRepositorio);
            this.buscarNotaId = new BuscarNotaPorIdService(this.notaRepositorio);
            this.buscarNotasCarpeta = new BuscarNotasCarpetaService(this.notaRepositorio);
            this.buscarEliminadas = new BuscarNotasEliminadasUsuarioService(this.notaRepositorio);
            this.buscarNotasUsuario = new BuscarNotasUsuarioService(this.notaRepositorio);
            this.buscarPalabraClave = new BuscarNotasPorPalabraClaveService(this.notaRepositorio);
            this.buscarEtiqueta = new BuscarNotasPorEtiquetaService(this.notaRepositorio);
            this.buscarGeolocalizacion = new BuscarNotasPorGeolocalizacionService(this.notaRepositorio);
        }

    @Post('/findAll')
    async findAll(@Res() response){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarNotas,'Se llamo a buscar notas').execute('buscar notas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarNotaIdDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarNotaId,'Se llamo a buscar nota por id').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByFolder')
    async findByFolder(@Res() response, @Body() body: BuscarNotasCarpetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarNotasCarpeta,'Se llamo a buscar notas por carpeta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findDeleted')
    async findDeleted(@Res() response, @Body() body: BuscarNotasEliminadasUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarEliminadas,'Se llamo a buscar notas eliminadas por usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
    
    @Put('/modificate')
    async update(@Res() response, @Body() body: ModificarNotaDto){
        

        if(!body.etiquetas)
            body.etiquetas=[]
        
            let etiq = body.etiquetas.map(ima => {
                return ima;
            })   
            
            console.log("controller etiq",etiq)

        const result = await new LoggerDecorator(this.logRepositorio,this.modificarNota,'Se llamo a modificar nota').execute(body);

        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/create')
 async create(@Res() response, @Body() body: CrearNotaDto){


        if(!body.etiquetas)
            body.etiquetas=[]

            // let etiq = body.etiquetas.map(ima => {
            //     return ima;
            // }) 
            // body.etiquetas=etiq;

            //console.log("controller etiq",etiq)

        console.log(body);
    
        const result = await new LoggerDecorator(this.logRepositorio,this.crearNotaService,'Se llamo a crear nota').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
}   

    @Delete('/delete')
    async delete (@Res() response, @Body() body: BorraNotaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.eliminarNota,'Se llamo a eliminar nota').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }

    }


    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarNotasUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarNotasUsuario,'Se llamo a buscar notas por usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByKeyword')
    async findByKeyword(@Res() response, @Body() body: BuscarNotasPalabraClaveDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarPalabraClave,'Se llamo a buscar notas por palabra clave').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByTag')
    async findByTag(@Res() response, @Body() body: BuscarNotasEtiquetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarEtiqueta,'Se llamo a buscar notas por etiqueta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByLocation')
    async findByLocation(@Res() response, @Body() body: BuscarNotasGeolocalizacionDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarGeolocalizacion,'Se llamo a buscar notas por geolocalizacion').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}