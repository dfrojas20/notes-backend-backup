import { InjectRepository } from "@nestjs/typeorm";
import { EtiquetaRepositorio } from "src/etiqueta/dominio/EtiquetaRepositorio";
import { Repository } from "typeorm";
import { EtiquetaEntity } from "../Entity/EtiquetaEntity";
import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { Either } from "src/utilidad/Either";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";


export class RepositorioEtiquetaAdaptador implements EtiquetaRepositorio {

    constructor(
        @InjectRepository(EtiquetaEntity)
        private readonly repositorio: Repository<EtiquetaEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly repositorioUsuario: Repository<UsuarioEntity>,
    ){}


    async guardarEriqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {
        try{
            const user = await this.repositorioUsuario.findOneBy({id:etiqueta.getUsuario()});
            const etiquetaEnt : EtiquetaEntity = {
                id: etiqueta.getID(),
                nombre: etiqueta.getNombre(),
                nota:[],
                usuario:user
            };
            const result = await this.repositorio.save(etiquetaEnt);
            if(result){
                return Either.makeRight<Error,Etiqueta>(etiqueta);
            }
            else{
                return Either.makeLeft<Error,Etiqueta>(new Error('Error al crear etiqueta'));
            }   
        }
        catch(error){
            return Either.makeLeft<Error,Etiqueta>(new Error('Error al crear etiqueta'));
        }
    }

    async modificarEtiqueta(etiqueta: Etiqueta): Promise<Either<Error, Etiqueta>> {

        try{

            const user = await this.repositorioUsuario.findOneBy({id:etiqueta.getUsuario()});
            
            const etiquetaEnt : EtiquetaEntity = {
                id: etiqueta.getID(),
                nombre: etiqueta.getNombre(),
                nota:[],
                usuario:user
            };
            const result = await this.repositorio.save(etiquetaEnt);
            if(result){
                return Either.makeRight<Error,Etiqueta>(etiqueta);
            }
            else{
                return Either.makeLeft<Error,Etiqueta>(new Error('Error al modificar etiqueta'));
            }   
        }
        catch(error){
            return Either.makeLeft<Error,Etiqueta>(new Error('Error al modificar etiqueta'));
        }
    }

    async eliminarEtiqueta(id:string): Promise<Either<Error,string>> {

        const result = await this.repositorio.delete(id);
        if(result){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }

    async buscarEtiquetas(): Promise<Either<Error, Etiqueta[]>> {
        const result: EtiquetaEntity[] = await this.repositorio.find({relations: ['usuario'],});
        console.log("repo",result.map)
        if(result){
            const etiquetas: Etiqueta[] = result.map((etiqueta) =>
                Etiqueta.create(etiqueta.nombre,etiqueta.usuario.id,etiqueta.id).getRight());
            return Either.makeRight<Error,Etiqueta[]>(etiquetas);
        }
        else{
            return Either.makeLeft<Error,Etiqueta[]>(new Error('No se encontraron etiquetas'));
        }
    }

    async buscarEtiqueta(id: string): Promise<Either<Error, Etiqueta>> {
        const result = (await this.repositorio.find({where: {id:id},relations: ['usuario']})).at(0);
        console.log("repo",result)
        if(result){
            const etiqueta: Etiqueta = Etiqueta.create(result.nombre,result.usuario.id, result.id).getRight();
            return Either.makeRight<Error,Etiqueta>(etiqueta);
        }
        else{
            return Either.makeLeft<Error,Etiqueta>(new Error('No se encontraron etiquetas'));
        }

    }


    async buscarEtiquetasPorUsuario(idUsuario: string): Promise<Either<Error, Iterable<Etiqueta>>> {
        const result: EtiquetaEntity[] = await this.repositorio.find({where: {usuario:{id:idUsuario}},relations: ['usuario']});
        console.log("repo",result)
        if(result.length!=0){
            const carpetas: Etiqueta[] = result.map((etiqueta) =>
                Etiqueta.create(etiqueta.nombre,etiqueta.usuario.id,etiqueta.id).getRight());
            return Either.makeRight<Error,Etiqueta[]>(carpetas);
        }
        else{
            return Either.makeLeft<Error,Etiqueta[]>(new Error('No se encontraron etiquetas'));
        }
    }

}