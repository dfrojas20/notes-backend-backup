import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { RepositorioSuscripcionAdaptador } from "../Repositorio/RepositorioSuscripcionAdaptador";
import { CrearSuscripcionService } from "src/suscripcion/aplicacion/CrearSuscripcionService";
import { CrearSuscripcionDto } from "src/suscripcion/aplicacion/Dto/CrearSuscipcionDto";
import { ModificarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/ModificarSuscripcionDto";
import { ModificarSuscripcionService } from "src/suscripcion/aplicacion/ModificarSuscripcionService";
import { EliminarSuscripcionService } from "src/suscripcion/aplicacion/EliminarSuscripcionService";
import { EliminarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/EliminarSuscripcionDto";
import { BuscarSuscripcionesService } from "src/suscripcion/aplicacion/BuscarSuscripcionesService";
import { BuscarSuscripcionPorId } from "src/suscripcion/aplicacion/BuscarSuscripcionService";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { Repository } from "typeorm";
import { BuscarSuscripcionUsuarioDto } from "src/suscripcion/aplicacion/Dto/BuscarSuscripcionusuarioDto";
import { BuscarSuscripcionUsuarioService } from "src/suscripcion/aplicacion/BuscarSuscripcionUsuarioService";
import { BuscarSuscripcionDto } from "src/suscripcion/aplicacion/Dto/BuscarSuscripcionesDto";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";



@Controller('suscripcion')
export class SuscripcionController {

    constructor(@InjectRepository(UsuarioEntity)
                private readonly repositorioUsuario: Repository<UsuarioEntity>,
                private crearSuscripcion: CrearSuscripcionService,
                private modificarSuscripcion: ModificarSuscripcionService,
                private eliminarSuscripcion: EliminarSuscripcionService,
                private buscarSuscripciones: BuscarSuscripcionesService,
                private bucarSuscripcion: BuscarSuscripcionPorId,
                private buscarSuscripcionPorUsuario: BuscarSuscripcionUsuarioService,
                private readonly suscripcionRepositorio: RepositorioSuscripcionAdaptador,
                private readonly logRepositorio: LoggerImplementation){
                    this.crearSuscripcion = new CrearSuscripcionService(this.suscripcionRepositorio);
                    this.modificarSuscripcion = new ModificarSuscripcionService(this.suscripcionRepositorio)
                    this.eliminarSuscripcion = new EliminarSuscripcionService(this.suscripcionRepositorio)
                    this.buscarSuscripciones = new BuscarSuscripcionesService(this.suscripcionRepositorio)
                    this.bucarSuscripcion = new BuscarSuscripcionPorId(this.suscripcionRepositorio)
                    this.buscarSuscripcionPorUsuario = new BuscarSuscripcionUsuarioService(this.suscripcionRepositorio)
                }

    @Post('/create')
    async create(@Res() response, @Body() body: CrearSuscripcionDto){
        console.log("controller",body)
        const result = await new LoggerDecorator(this.logRepositorio,this.crearSuscripcion,'Se llamo a crear suscripcion').execute(body);
        if(result.isRight()){  
            const usuario = await this.repositorioUsuario.findOneBy({id:body.idUsuario});
            //console.log("controller usuario",usuario)
            usuario.suscripcion = true;
            await this.repositorioUsuario.save(usuario)
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarSuscripcionDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.modificarSuscripcion,'Se llamo a modificar suscripcion').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }

    @Delete('/delete')
    async delete(@Res() response, @Body() body: EliminarSuscripcionDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.eliminarSuscripcion,'Se llamo a eliminar suscripcion').execute(body);
        if(result.isRight()){
            const usuario = await this.repositorioUsuario.findOneBy({id:body.idUsuario});
            //console.log("controller usuario",usuario)
            usuario.suscripcion = false;
            await this.repositorioUsuario.save(usuario)
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }     
    }


    @Post('/findAll')
    async findAll(@Res() response){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarSuscripciones,'Se llamo a buscar suscripciones').execute('buscar suscripciones');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }    
    


    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarSuscripcionDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.bucarSuscripcion,'Se llamo a buscar suscripcion por id').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByUser')
    async findByUser(@Res() response, @Body() body: BuscarSuscripcionUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarSuscripcionPorUsuario,'Se llamo a buscar suscripcion por usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}