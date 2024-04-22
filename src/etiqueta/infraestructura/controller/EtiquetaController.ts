import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BuscarEtiquetaIdService } from "src/etiqueta/aplicacion/BuscarEtiquetaIdService";
import { BuscarEtiquetasPorUsuarioService } from "src/etiqueta/aplicacion/BuscarEtiquetaPorUsuarioService";
import { BuscarEtiquetasService } from "src/etiqueta/aplicacion/BuscarEtiquetasService";
import { CrearEtiquetaService } from "src/etiqueta/aplicacion/CrearEtiquetaService";
import { BuscarEtiquetaIdDto } from "src/etiqueta/aplicacion/Dto/BuscarEtiquetaIdDto";
import { BuscarEtiquetaPorUsuarioDto } from "src/etiqueta/aplicacion/Dto/BuscarEtiquetaPorUsuarioDto";
import { CrearEtiquetaDto } from "src/etiqueta/aplicacion/Dto/CrearEtiquetaDto";
import { EliminarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/EliminarEtiquetaDto";
import { ModificarEtiquetaDto } from "src/etiqueta/aplicacion/Dto/ModificarEtiquetaDto";
import { EliminarEtiquetaService } from "src/etiqueta/aplicacion/EliminarEtiquetaService";
import { ModificarEtiquetaService } from "src/etiqueta/aplicacion/ModificarEtiquetaService";
import { RepositorioEtiquetaAdaptador } from "../repositorio/RepositorioEtiquetaAdaptador";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";


@Controller('etiqueta')
export class EtiquetaController {

    constructor(private crearEtiqueta: CrearEtiquetaService,
                private modificarEtiqueta: ModificarEtiquetaService,
                private eliminarEtiqueta: EliminarEtiquetaService,
                private buscarEtiquetas: BuscarEtiquetasService,
                private buscarEtiqueta:BuscarEtiquetaIdService,
                private buscarEtiquetasPorUsuario:BuscarEtiquetasPorUsuarioService,
                private readonly etiquetaRepositorio: RepositorioEtiquetaAdaptador,
                private readonly logRepositorio: LoggerImplementation){
                    this.crearEtiqueta = new CrearEtiquetaService(this.etiquetaRepositorio);
                    this.modificarEtiqueta = new ModificarEtiquetaService(this.etiquetaRepositorio);
                    this.eliminarEtiqueta = new EliminarEtiquetaService(this.etiquetaRepositorio);
                    this.buscarEtiquetas = new BuscarEtiquetasService(this.etiquetaRepositorio);
                    this.buscarEtiqueta = new BuscarEtiquetaIdService(this.etiquetaRepositorio);
                    this.buscarEtiquetasPorUsuario = new BuscarEtiquetasPorUsuarioService(this.etiquetaRepositorio);
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearEtiquetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.crearEtiqueta,'Se llamo a crear etiqueta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarEtiquetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.modificarEtiqueta,'Se llamo a modificar etiqueta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Delete('/delete')
    async delete(@Res() response, @Body() body: EliminarEtiquetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.eliminarEtiqueta,'Se llamo a eliminar etiqueta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Post('/findAll')
    async findAll(@Res() response){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarEtiquetas,'Se llamo a buscar etiquetas').execute('buscar etiquetas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }    
    


    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarEtiquetaIdDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarEtiqueta,'Se llamo a buscar etiqueta por id').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarEtiquetaPorUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarEtiquetasPorUsuario,'Se llamo a buscar etiquetas por usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}