import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { CarpetaRepositorioAdaptador } from "src/carpeta/infraestructura/Repositorio/CarpetaRepositorioAdaptador";
import { BuscarUsuarioCorreoClaveService } from "src/usuario/aplicacion/BuscarUsuarioCorreoClaveService";
import { BuscarUsuarioPorIdService } from "src/usuario/aplicacion/BuscarUsuarioPorIdService";
import { BuscarUsuariosService } from "src/usuario/aplicacion/BuscarUsuariosService";
import { BuscarUsuarioCorreoClaveDto } from "src/usuario/aplicacion/DataTransferObject/BuscarUsuarioCorreoClaveDto";
import { BuscarUsuarioIdDto } from "src/usuario/aplicacion/DataTransferObject/BuscarUsuarioIdDto";
import { ModificarUsuarioDto } from "src/usuario/aplicacion/DataTransferObject/ModificarUsuarioDto";
import { RegistrarUsuarioDto } from "src/usuario/aplicacion/DataTransferObject/RegistrarUsuarioDto";
import { ModificarUsuarioService } from "src/usuario/aplicacion/ModificarUsuarioService";
import { RegistrarUsuarioService } from "src/usuario/aplicacion/RegistrarUsuarioService";
import { UsuarioRepositorioAdaptador } from "../Repositorio/UsuarioRepositorioAdaptador";
import { EliminarUsuarioService } from "src/usuario/aplicacion/EliminarUsuarioService";
import { EliminarUsuarioDto } from "src/usuario/aplicacion/DataTransferObject/EliminarUsuarioDto";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";

@Controller('usuario')
export class UsuarioController {

    constructor(private registrarUsuario: RegistrarUsuarioService,
                private crearCarpeta: CrearCarpetaService,
                private modificarUsuario: ModificarUsuarioService,
                private buscarUsuarios: BuscarUsuariosService,
                private buscarUsuarioId: BuscarUsuarioPorIdService,
                private buscarUsuarioCorreoClave: BuscarUsuarioCorreoClaveService,
                private eliminarUsuario: EliminarUsuarioService,
                private readonly carpetaRepositorio: CarpetaRepositorioAdaptador,
                private readonly usuarioRepositorio: UsuarioRepositorioAdaptador,
                private readonly logRepositorio: LoggerImplementation){
                    this.crearCarpeta = new CrearCarpetaService(this.carpetaRepositorio);
                    this.registrarUsuario = new RegistrarUsuarioService(this.usuarioRepositorio);
                    this.modificarUsuario = new ModificarUsuarioService(this.usuarioRepositorio);
                    this.buscarUsuarios = new BuscarUsuariosService(this.usuarioRepositorio);
                    this.buscarUsuarioId = new BuscarUsuarioPorIdService(this.usuarioRepositorio);
                    this.buscarUsuarioCorreoClave = new BuscarUsuarioCorreoClaveService(this.usuarioRepositorio);
                    this.eliminarUsuario = new EliminarUsuarioService(this.usuarioRepositorio);
                }

    @Post('/create')
    async create(@Res() response, @Body() body: RegistrarUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.registrarUsuario,'Se llamo a registrar usuario').execute(body);
        if(result.isRight()){

            const carp: CrearCarpetaDto ={
                nombre: 'Carpeta Predeterminada',
                predeterminada: true,
                idUsuario: result.getRight().getId(),
            }

            let result2 = await this.crearCarpeta.execute(carp);
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findAll')
    async findAll(@Res() response){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarUsuarios,'Se llamo a buscar usuarios').execute('buscar usuarios');
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findById')
    async findById(@Res() response, @Body() body: BuscarUsuarioIdDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarUsuarioId,'Se llamo a buscar usuario por id').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Post('/findByEmailPassword')
    async findByEmailPassword(@Res() response, @Body() body: BuscarUsuarioCorreoClaveDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.buscarUsuarioCorreoClave,'Se llamo a buscar usuario por correo y clave').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Put('/modificate')
    async modificate(@Res() response, @Body() body: ModificarUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.modificarUsuario,'Se llamo a modificar usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

    @Delete('/delete')
    async delete(@Res() response, @Body() body: EliminarUsuarioDto){
        const result = await new LoggerDecorator(this.logRepositorio,this.eliminarUsuario,'Se llamo a eliminar usuario').execute(body);
        if(result.isRight()){
            return response.status(HttpStatus.OK).json(result.getRight());
        }
        else{
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
        }
    }

}