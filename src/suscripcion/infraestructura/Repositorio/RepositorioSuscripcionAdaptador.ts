import { Either } from "src/utilidad/Either";
import { Not, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { RepositorioSuscripcion } from "src/suscripcion/dominio/RepositorioSuscripcion";
import { SuscripcionEntity } from "../Entity/SuscripcionEntity";
import { Suscripcion } from "src/suscripcion/dominio/suscripcion";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Injectable()
export class RepositorioSuscripcionAdaptador implements RepositorioSuscripcion{

    constructor(
        @InjectRepository(SuscripcionEntity)
        private readonly repositorio: Repository<SuscripcionEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly repositorioUsuario: Repository<UsuarioEntity>,
        
    ){}

    async crearSuscripcion(nota: Suscripcion): Promise<Either<Error,Suscripcion>> {

        try{
        
            console.log("repo",nota)
            console.log("repo usuario tarido",nota.getUuario())
            const usuario = await this.repositorioUsuario.findOneBy({id:nota.getUuario()});
            console.log("repo usuario",usuario)
            
            const suscrip : SuscripcionEntity = {
                id: nota.getId(),
                estado: nota.getEstado(),
                fechaInicio: nota.getFechaInicio(),
                fechaFin: nota.getFechFin(),
                usuario: usuario
            };
            console.log("repo suscripcion",suscrip)

            const result = await this.repositorio.save(suscrip);
            if(result){
                return Either.makeRight<Error,Suscripcion>(nota);
            }
            else{
                return Either.makeLeft<Error,Suscripcion>(new Error('Error al guardar suscripcion'));
            }   
        }
        catch(error){
            return Either.makeLeft<Error,Suscripcion>(new Error('Error al guardar suscripcion'));
        }    
    }

        async buscarSuscripciones(): Promise<Either<Error,Iterable<Suscripcion>>> {          
            const result: SuscripcionEntity[] = await this.repositorio.find({relations: ['usuario'],});
            if(result.length!=0){
                const suscrip: Suscripcion[] = result.map((nota) =>
                    Suscripcion.create(nota.fechaInicio, 
                        nota.fechaFin, 
                        nota.estado,
                        nota.usuario.id,
                        nota.id).getRight());
                return Either.makeRight<Error,Suscripcion[]>(suscrip);
            }
            else{
                return Either.makeLeft<Error,Suscripcion[]>(new Error('No se encontraron suscripciones'));
            }
        }

    async buscarSuscripcion(id:string): Promise<Either<Error,Suscripcion>> {
        const result = (await this.repositorio.find({where: {id:id},relations: ['usuario']})).at(0);
        if(result){
            const suscripcion: Suscripcion = Suscripcion.create(result.fechaInicio,result.fechaFin,result.estado,result.usuario.id ,result.id).getRight();
            return Either.makeRight<Error,Suscripcion>(suscripcion);
        }
        else{
            return Either.makeLeft<Error,Suscripcion>(new Error('No se encontraron suscripciones'));
        }
    }

    async modificarSuscripcion(nota: Suscripcion): Promise<Either<Error, Suscripcion>> {

        try{

            let notaId = await this.repositorio.findOneBy({id:nota.getId()});  
            const usuario = await this.repositorioUsuario.findOneBy({id:nota.getUuario()});
            

            const note :SuscripcionEntity = {
                id: notaId.id = nota.getId(),
                estado: notaId.estado =nota.getEstado(),
                fechaInicio: notaId.fechaInicio = nota.getFechaInicio(),
                fechaFin: notaId.fechaFin = nota.getFechFin(),
                usuario:usuario
            }; 
            
            console.log("repo1",note)
            const result = await this.repositorio.save(note);
            if(result){
                return Either.makeRight<Error,Suscripcion>(nota);
            }
            else{
                return Either.makeLeft<Error,Suscripcion>(new Error('Error al modificar suscripcion'));
            }
        }
        catch(error){
            return Either.makeLeft<Error,Suscripcion>(new Error('Error al modificar suscripcion'));
        }
    }

    async eliminarSuscripcion(id:string): Promise<Either<Error,string>> {

        const result = await this.repositorio.delete(id);
        if(result.affected != 0){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }

        
    }

    async buscarSuscripcionPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Suscripcion>>> {
        const result: SuscripcionEntity[] = await this.repositorio.find({where: {usuario:{id:idUsuario}},relations: ['usuario']});
        if(result.length!=0){
            const carpetas: Suscripcion[] = result.map((carpeta) =>
                Suscripcion.create(carpeta.fechaInicio,carpeta.fechaFin,carpeta.estado,carpeta.usuario.id,carpeta.id).getRight());
            return Either.makeRight<Error,Suscripcion[]>(carpetas);
        }
        else{
            return Either.makeLeft<Error,Suscripcion[]>(new Error('No se encontraron carpetas'));
        }
    }


}