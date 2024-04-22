import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarpetaRepositorio } from "src/carpeta/dominio/CarpetaRepositorio";
import { Repository } from "typeorm";
import { CarpetaEntity } from "../Entity/CarpetaEntity";
import { Either } from "src/utilidad/Either";
import { Carpeta } from "src/carpeta/dominio/Carpeta";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { Nota } from "src/nota/dominio/Nota";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { EstadoNota } from "src/nota/dominio/ValueObject/EstadoNota";

@Injectable()
export class CarpetaRepositorioAdaptador implements CarpetaRepositorio{

    constructor(
        @InjectRepository(CarpetaEntity)
        private readonly repositorio: Repository<CarpetaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly repositorioUsuario: Repository<UsuarioEntity>,
        @InjectRepository(NotaEntity)
        private readonly repositorioNota: Repository<NotaEntity>
    ){}

    async crearCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {

        try{

            const user = await this.repositorioUsuario.findOneBy({id:carpeta.getIdUsuario()});

            const carpetaEnt : CarpetaEntity = {
                id: carpeta.getId(),
                nombre: carpeta.getNombre(),
                predeterminada: carpeta.getPredeterminada(),
                nota: [],
                usuario: user 
            };
            const result = await this.repositorio.save(carpetaEnt);
            if(result){
                return Either.makeRight<Error,Carpeta>(carpeta);
            }
            else{
                return Either.makeLeft<Error,Carpeta>(new Error('Error al crear carpeta'));
            }
        }
        catch(error){
            return Either.makeLeft<Error,Carpeta>(new Error('Error al crear carpeta'));
        }
    }

    async buscarCarpetas(): Promise<Either<Error, Iterable<Carpeta>>> {
        const result: CarpetaEntity[] = await this.repositorio.find({relations: ['usuario']});
        if(result.length!=0){
            const carpetas: Carpeta[] = result.map((carpeta) =>
                Carpeta.create(carpeta.nombre, carpeta.predeterminada,carpeta.usuario.id,carpeta.id).getRight());
            return Either.makeRight<Error,Carpeta[]>(carpetas);
        }
        else{
            return Either.makeLeft<Error,Carpeta[]>(new Error('No se encontraron carpetas'));
        }
    }

    async buscarCarpeta(id: string): Promise<Either<Error, Carpeta>> {
        const result = (await this.repositorio.find({where: {id:id},relations: ['usuario']})).at(0);
        if(result){
            const carpeta: Carpeta = Carpeta.create(result.nombre, result.predeterminada,result.usuario.id,result.id).getRight();
            return Either.makeRight<Error,Carpeta>(carpeta);
        }
        else{
            return Either.makeLeft<Error,Carpeta>(new Error('No se encontraron carpetas'));
        }
    }

    async buscarCarpetasPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Carpeta>>> {
        const result: CarpetaEntity[] = await this.repositorio.find({where: {usuario:{id:idUsuario}},relations: ['usuario']});
        if(result.length!=0){
            const carpetas: Carpeta[] = result.map((carpeta) =>
                Carpeta.create(carpeta.nombre, carpeta.predeterminada,carpeta.usuario.id,carpeta.id).getRight());
            return Either.makeRight<Error,Carpeta[]>(carpetas);
        }
        else{
            return Either.makeLeft<Error,Carpeta[]>(new Error('No se encontraron carpetas'));
        }
    }

    async modificarCarpeta(carpeta: Carpeta): Promise<Either<Error, Carpeta>> {

        try{

            const user = await this.repositorioUsuario.findOneBy({id:carpeta.getIdUsuario()});

            const notas = await this.repositorioNota.find({where: {carpeta:{id: carpeta.getId()}}});

            const carpetaEnt : CarpetaEntity = {
                id: carpeta.getId(),
                nombre: carpeta.getNombre(),
                predeterminada: carpeta.getPredeterminada(),
                nota: notas,
                usuario: user
            };
            const result = await this.repositorio.save(carpetaEnt);
            if(result){
                return Either.makeRight<Error,Carpeta>(carpeta);
            }
            else{
                return Either.makeLeft<Error,Carpeta>(new Error('Error al modificar carpeta'));
            }
        }
        catch(error){
            return Either.makeLeft<Error,Carpeta>(new Error('Error al modificar carpeta'));
        }
    }

    async eliminarCarpeta(id: string): Promise<Either<Error, string>> {
        console.log(id);
        const eliminarNotas = await this.pasarNotasCarpetaAPapelera(id);
        if(eliminarNotas.isLeft()){
            return Either.makeLeft<Error,string>(new Error('No se pudo eliminar la carpeta'));
        }
        else{
            const result = await this.repositorio.delete({id:id});
            if(result.affected != 0){
                return Either.makeRight<Error,string>('Carpeta eliminada');
            }
            else{
                return Either.makeLeft<Error,string>(new Error('No se pudo eliminar la carpeta'));
            }
        }  
    }

    private async buscarCarpetaPredeterminadaUsuario(idUsuario: string): Promise<Either<Error, CarpetaEntity>> {
        const result = (await this.repositorio.find({where: {usuario:{id:idUsuario},predeterminada:true},relations: ['usuario']})).at(0);
        if(result){
            return Either.makeRight<Error,CarpetaEntity>(result);
        }
        else{
            return Either.makeLeft<Error,CarpetaEntity>(new Error('No se encontraron carpetas'));
        }
    }

    private async pasarNotasCarpetaAPapelera(idCarpeta: string): Promise<Either<Error, string>> {
        console.log(idCarpeta);
        const notas = await this.repositorioNota.find({where: {carpeta:{id: idCarpeta}}});
        console.log(notas);
        const carpeta = (await this.repositorio.find({where: {id:idCarpeta},relations: ['usuario']})).at(0);
        console.log(carpeta);
        if(carpeta){
            const usuario = carpeta.usuario.id;
            const predeterminada = await this.buscarCarpetaPredeterminadaUsuario(usuario);
            if(predeterminada.isLeft()){
                return Either.makeLeft<Error,string>(new Error('No se encontraron carpetas predeterminadas'));
            }
            else{
                for(let nota of notas){
                    nota.estado = EstadoNota.Eliminada;
                    nota.carpeta = predeterminada.getRight();
                    await this.repositorioNota.save(nota);
                }
                return Either.makeRight<Error,string>('Notas eliminadas');
            }
        }
        else{
            return Either.makeLeft<Error,string>(new Error('No se encontraron carpetas para eliminar'));
        }
    }
    
}