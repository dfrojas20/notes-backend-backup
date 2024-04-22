import { Inject, Injectable } from "@nestjs/common";
import { UsuarioRepositorio } from "src/usuario/dominio/UsuarioRepositorio";
import { Repository } from "typeorm";
import { UsuarioEntity } from "../Entity/UsuarioEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/usuario/dominio/Usuario";
import { Either } from "src/utilidad/Either";
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity";

@Injectable()
export class UsuarioRepositorioAdaptador implements UsuarioRepositorio{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly repositorio: Repository<UsuarioEntity>,
        @InjectRepository(CarpetaEntity)
        private readonly repositorioCarpeta: Repository<CarpetaEntity>,
        @InjectRepository(EtiquetaEntity)
        private readonly repositorioEtiqueta: Repository<EtiquetaEntity>
    ){}

    async registrarUsuario(usuario: Usuario): Promise<Either<Error, Usuario>> {

        const usuarioEnt : UsuarioEntity = {
            id: usuario.getId(),
            nombre: usuario.getNombre(),
            correo: usuario.getCorreo(),
            clave: usuario.getClave(),
            fechaNacimiento: usuario.getFechaNacimiento(),
            carpeta: [],
            etiqueta:[],
            suscripcion:usuario.getSuscripcion()
        };

        const result = await this.repositorio.save(usuarioEnt);

        if(result){
            return Either.makeRight<Error,Usuario>(usuario);

        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
        }

    }

    async buscarUsuarios(): Promise<Either<Error, Iterable<Usuario>>> {
        const result: UsuarioEntity[] = await this.repositorio.find();
        if(result.length!=0){
            const usuarios: Usuario[] = result.map((usuario) =>
                Usuario.create(usuario.nombre, usuario.correo,usuario.clave,usuario.fechaNacimiento,usuario.suscripcion,usuario.id).getRight());
            return Either.makeRight<Error,Usuario[]>(usuarios);
        }
        else{
            return Either.makeLeft<Error,Usuario[]>(new Error('Error de la base de datos'));
        }
    }

    async buscarUsuarioPorId(id: string): Promise<Either<Error, Usuario>> {
        const result: UsuarioEntity = await this.repositorio.findOneBy({id:id});
        if(result){
            const usuario: Usuario = Usuario.create(result.nombre, result.correo,result.clave,result.fechaNacimiento,result.suscripcion,result.id).getRight();
            return Either.makeRight<Error,Usuario>(usuario);
        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
        }
    }

    async buscarUsuarioPorCorreoClave(correo: string, clave: string): Promise<Either<Error, Usuario>> {
        const result: UsuarioEntity = await this.repositorio.findOneBy({correo:correo,clave:clave});
        if(result){
            const usuario: Usuario = Usuario.create(result.nombre, result.correo,result.clave,result.fechaNacimiento,result.suscripcion,result.id).getRight();
            return Either.makeRight<Error,Usuario>(usuario);
        }
        else{
            return Either.makeLeft<Error,Usuario>(new Error('No se encontro el usuario'));
        }
    }

    async modificarUsuario(usuario: Usuario): Promise<Either<Error, Usuario>> {

        const carpetas = await this.repositorioCarpeta.find({where: {usuario: {id: usuario.getId()}}});
        const etiquetas = await this.repositorioEtiqueta.find({where: {usuario: {id: usuario.getId()}}});

            const usuarioEnt : UsuarioEntity = {
                id: usuario.getId(),
                nombre: usuario.getNombre(),
                correo: usuario.getCorreo(),
                clave: usuario.getClave(),
                fechaNacimiento: usuario.getFechaNacimiento(),
                carpeta: carpetas,
                etiqueta:etiquetas,
                suscripcion:usuario.getSuscripcion()
            };
    
            const result = await this.repositorio.save(usuarioEnt);
    
            if(result){
                return Either.makeRight<Error,Usuario>(usuario);
    
            }
            else{
                return Either.makeLeft<Error,Usuario>(new Error('Error de la base de datos'));
            }
    
    }

    async eliminarUsuario(id: string): Promise<Either<Error, string>> {
        const result = await this.repositorio.delete(id);
        if(result.affected>0){
            return Either.makeRight<Error,string>('Usuario eliminado');
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }

}