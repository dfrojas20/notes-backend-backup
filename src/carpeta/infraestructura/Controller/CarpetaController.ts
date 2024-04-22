import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BuscarCarpetaPorIdService } from "src/carpeta/aplicacion/BuscarCarpetaPorIdService";
import { BuscarCarpetasPorUsuarioService } from "src/carpeta/aplicacion/BuscarCarpetasPorUsuarioService";
import { BuscarCarpetasService } from "src/carpeta/aplicacion/BuscarCarpetasService";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { BorrarCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/BorrarCarpetaDto";
import { BuscarCarpetaIdDto } from "src/carpeta/aplicacion/DataTransferObjects/BuscarCarpetaIdDto";
import { BuscarCarpetasUsuarioDto } from "src/carpeta/aplicacion/DataTransferObjects/BuscarCarpetasUsuarioDto";
import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { ModificarCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/ModificarCarpetaDto";
import { EliminarCarpetaService } from "src/carpeta/aplicacion/EliminarCarpetaService";
import { ModificarCarpetaService } from "src/carpeta/aplicacion/ModificarCarpetaService";
import { CarpetaRepositorioAdaptador } from "../Repositorio/CarpetaRepositorioAdaptador";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";

@Controller('carpeta')
export class CarpetaController {

    constructor(private crearCarpeta: CrearCarpetaService,
                private buscarCarpetas: BuscarCarpetasService,
                private buscarCarpeta: BuscarCarpetaPorIdService,
                private modificarCarpeta: ModificarCarpetaService,
                private eliminarCarpeta: EliminarCarpetaService,
                private buscarCarpetasUsuario: BuscarCarpetasPorUsuarioService,
                private readonly carpetaRepositorio: CarpetaRepositorioAdaptador,
                private readonly logRepositorio: LoggerImplementation){
                    this.crearCarpeta = new CrearCarpetaService(this.carpetaRepositorio);
                    this.buscarCarpetas = new BuscarCarpetasService(this.carpetaRepositorio);
                    this.buscarCarpeta = new BuscarCarpetaPorIdService(this.carpetaRepositorio);
                    this.modificarCarpeta = new ModificarCarpetaService(this.carpetaRepositorio);
                    this.eliminarCarpeta = new EliminarCarpetaService(this.carpetaRepositorio);
                    this.buscarCarpetasUsuario = new BuscarCarpetasPorUsuarioService(this.carpetaRepositorio);
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearCarpetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.crearCarpeta,'Se llamo a crear carpeta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Post('/findAll')
    async findAll(@Res() response){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarCarpetas,'Se llamo a buscar carpetas').execute('buscar carpetas');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarCarpetaIdDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarCarpeta,'Se llamo a buscar carpeta por id').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarCarpetasUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarCarpetasUsuario,'Se llamo a buscar carpetas por usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Put('/modificate')
    async update(@Res() response, @Body() body: ModificarCarpetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.modificarCarpeta,'Se llamo a modificar carpeta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Delete('/delete')
    async delete(@Res () response, @Body() body: BorrarCarpetaDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.eliminarCarpeta,'Se llamo a eliminar carpeta').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }
}