import { Nota } from "src/nota/dominio/Nota";
import { NotaRepositorio } from "src/nota/dominio/NotaRepositorio";
import { Either } from "src/utilidad/Either";
import { Not, Repository } from "typeorm";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity";
import { Etiqueta } from "src/etiqueta/dominio/etiqueta";
import { TareaEntity } from "../Entity/TareaEntity";
import { Tarea } from "src/nota/dominio/Tarea";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Injectable()
export class NotaRepositorioAdaptador implements NotaRepositorio{

    constructor(
        @InjectRepository(NotaEntity)
        private readonly repositorio: Repository<NotaEntity>,
        @InjectRepository(CarpetaEntity)
        private readonly repositorioCarpeta: Repository<CarpetaEntity>,
        @InjectRepository(TareaEntity)
        private readonly repositorioTarea: Repository<TareaEntity>,
        
    ){}

    async crearNota(nota: Nota): Promise<Either<Error,Nota>> {

        try{

            const carp = await this.repositorioCarpeta.findOneBy({id:nota.getIdCarpeta()});

            let etiq = nota.getEtiquetas().map(ima => {
                const im = new EtiquetaEntity();
                im.id = ima;
                return im;
            }) 
            
            const note : NotaEntity = {
                id: nota.getId(),
                titulo: nota.getTitulo(),
                cuerpo: nota.getCuerpo(),
                fechaCreacion: nota.getFechaCreacion(),
                fechaModificacion: nota.getFechaModificacion(),
                latitud: nota.getLatitud(),
                longitud: nota.getLongitud(),
                estado: nota.getEstado(),
                carpeta: carp,
                etiqueta:etiq,
                tarea: []
            };

            const result = await this.repositorio.save(note);
            if(result){
                if(nota.getTareas().length > 0){
                    for(let tar of nota.getTareas()){
                        let t: TareaEntity = {
                            id: tar.getId(),
                            nombre: tar.getNombre(),
                            completada: tar.getCompletada(),
                            nota: result
                        }
                        const result2 = await this.repositorioTarea.save(t);
                        if(!result2){
                            return Either.makeLeft<Error,Nota>(new Error('Error al crear nota'));
                        }
                    }
                }
                return Either.makeRight<Error,Nota>(nota);
            }
            else{
                return Either.makeLeft<Error,Nota>(new Error('Error al crear nota'));
            }  
        }
        catch(error){
            return Either.makeLeft<Error,Nota>(new Error('Error al crear nota'));
        }     
    }

    async buscarNotas(): Promise<Either<Error,Iterable<Nota>>> {          
        const result: NotaEntity[] = await this.repositorio.find({relations: ['carpeta'],});
        if(result.length!=0){
            let notas: Nota[] = [];
            for(let nota of result){
                let n = Nota.create(nota.fechaCreacion,
                    nota.fechaModificacion,
                    nota.estado,
                    nota.titulo,
                    nota.cuerpo,
                    nota.carpeta.id,
                    nota.longitud,
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    nota.id).getRight();
                if(nota.tarea){
                    if(nota.tarea.length > 0){
                        for(let tar of nota.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

    async buscarNota(id:string): Promise<Either<Error,Nota>> {
        const result = (await this.repositorio.find({where: {id: id},relations: ['carpeta']})).at(0);
        
        if(result){
            let nota = Nota.create(result.fechaCreacion, result.fechaModificacion, result.estado, result.titulo, 
                result.cuerpo,  result.carpeta.id,result.longitud, result.latitud,result.etiqueta.map(ima => {
                    return ima.id
                }),result.id);
            
            if(result.tarea){
                if(result.tarea.length > 0){
                    for(let tar of result.tarea){
                        let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.getRight().getId()).getRight();
                        nota.getRight().agregarTarea(t);
                    }
                }
            }

            return Either.makeRight<Error,Nota>(nota.getRight());
        }
        else{
            return Either.makeLeft<Error,Nota>(new Error('No se encontraron notas'));
        }
    }

    async buscarNotasPorCarpeta(idCarpeta: string): Promise<Either<Error,Iterable<Nota>>> {
        console.log(idCarpeta);
        const result: NotaEntity[] = await this.repositorio.find({relations: ['carpeta'],where: {
                                                                    carpeta:{
                                                                        id: idCarpeta
                                                                    },
                                                                    estado:Not('Eliminada')}});
        console.log(idCarpeta);
        if(result.length != 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let n = Nota.create(nota.fechaCreacion,
                    nota.fechaModificacion,
                    nota.estado,
                    nota.titulo,
                    nota.cuerpo,
                    nota.carpeta.id,
                    nota.longitud,
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    nota.id).getRight();
                if(nota.tarea){
                    if(nota.tarea.length > 0){
                        for(let tar of nota.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

    async buscarNotasEliminadasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
        
        const result = await this.repositorio.find({where: {carpeta: {usuario: {id: idUsuario}}, estado: 'Eliminada'}, relations: ['carpeta']});
        if(result.length > 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let n = Nota.create(nota.fechaCreacion,
                    nota.fechaModificacion,
                    nota.estado,
                    nota.titulo,
                    nota.cuerpo,
                    nota.carpeta.id,
                    nota.longitud,
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    nota.id).getRight();
                if(nota.tarea){
                    if(nota.tarea.length > 0){
                        for(let tar of nota.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }

    }

    async modificarNota(nota: Nota): Promise<Either<Error, Nota>> {

        try{

            await this.repositorioTarea.delete({nota: {id: nota.getId()}});

            let notaId = await this.repositorio.findOneBy({id:nota.getId()});
            const carp = await this.repositorioCarpeta.findOneBy({id:nota.getIdCarpeta()});


                let etiq = nota.getEtiquetas().map(ima => {
                    const im = new EtiquetaEntity();
                    im.id = ima;
                    return im;
                })    

                console.log("repo",etiq)

            const note : NotaEntity = {
                id: notaId.id = nota.getId(),
                titulo: notaId.titulo= nota.getTitulo(),
                cuerpo: notaId.cuerpo = nota.getCuerpo(),
                fechaCreacion: notaId.fechaCreacion = nota.getFechaCreacion(),
                fechaModificacion: notaId.fechaModificacion = nota.getFechaModificacion(),
                latitud: notaId.latitud = nota.getLatitud(),
                longitud: notaId.longitud = nota.getLongitud(),
                estado: notaId.estado =nota.getEstado(),
                carpeta: carp,
                etiqueta:etiq,
                tarea: []
            }; 
            
            console.log("repo1",note)
            const result = await this.repositorio.save(note);
            if(result){
                if(nota.getTareas().length > 0){
                    for(let tar of nota.getTareas()){
                        let t: TareaEntity = {
                            id: tar.getId(),
                            nombre: tar.getNombre(),
                            completada: tar.getCompletada(),
                            nota: result
                        }
                        const result2 = await this.repositorioTarea.save(t);
                        if(!result2){
                            return Either.makeLeft<Error,Nota>(new Error('Error al crear nota'));
                        }
                    }
                }
                return Either.makeRight<Error,Nota>(nota);
            }
            else{
                return Either.makeLeft<Error,Nota>(new Error('Error al modificar nota'));
            }
        }
        catch(error){
            return Either.makeLeft<Error,Nota>(new Error('Error al modificar nota'));
        }
    }

    async eliminarNota(id:string): Promise<Either<Error,string>> {

        const result = await this.repositorio.delete(id);
        if(result.affected != 0){
            return Either.makeRight<Error,string>(id);
        }
        else{
            return Either.makeLeft<Error,string>(new Error('Error de la base de datos'));
        }
    }

    async buscarNotasUsuario(idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {

        const result = await this.repositorio.find({where: {carpeta: {usuario: {id: idUsuario}}, estado:Not('Eliminada')}, relations: ['carpeta']});
        if(result.length > 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let n = Nota.create(nota.fechaCreacion,
                    nota.fechaModificacion,
                    nota.estado,
                    nota.titulo,
                    nota.cuerpo,
                    nota.carpeta.id,
                    nota.longitud,
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    nota.id).getRight();
                if(nota.tarea){
                    if(nota.tarea.length > 0){
                        for(let tar of nota.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

    async buscarNotasPorPalabraClave(palabraClave: string,idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {

        const result = await this.repositorio
        .createQueryBuilder('nota')
        .leftJoinAndSelect('nota.etiqueta', 'etiqueta')
        .leftJoinAndSelect('nota.tarea', 'tarea')
        .leftJoinAndSelect('nota.carpeta', 'carpeta')
        .where('carpeta.usuario.id = :idUsuario', { idUsuario })
        .andWhere('(nota.titulo ILIKE :palabraClave OR nota.cuerpo ILIKE :palabraClave OR etiqueta.nombre ILIKE :palabraClave OR tarea.nombre ILIKE :palabraClave)')
        .andWhere('nota.estado != :eliminada', { eliminada: 'Eliminada' })
        .setParameter('palabraClave', `%${palabraClave}%`)
        .getMany();

        console.log(result);

        if(result.length > 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let aux = (await this.repositorio.find({where: {id: nota.id},relations: ['carpeta']})).at(0);
                let n = Nota.create(aux.fechaCreacion,
                    aux.fechaModificacion,
                    aux.estado,
                    aux.titulo,
                    aux.cuerpo,
                    aux.carpeta.id,
                    aux.longitud,
                    aux.latitud,
                    aux.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    aux.id).getRight();
                if(aux.tarea){
                    if(aux.tarea.length > 0){
                        for(let tar of aux.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,aux.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

    async buscarNotasPorEtiqueta(idEtiqueta: string,idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {
            
        const result = await this.repositorio
        .createQueryBuilder('nota')
        .leftJoinAndSelect('nota.etiqueta', 'etiqueta')
        .leftJoinAndSelect('nota.tarea', 'tarea')
        .leftJoinAndSelect('nota.carpeta', 'carpeta')
        .where('carpeta.usuario.id = :idUsuario', { idUsuario })
        .andWhere('etiqueta.id = :idEtiqueta', { idEtiqueta })
        .andWhere('nota.estado != :eliminada', { eliminada: 'Eliminada' })
        .getMany();

        if(result.length > 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let aux = (await this.repositorio.find({where: {id: nota.id},relations: ['carpeta']})).at(0);
                let n = Nota.create(aux.fechaCreacion,
                    aux.fechaModificacion,
                    aux.estado,
                    aux.titulo,
                    aux.cuerpo,
                    aux.carpeta.id,
                    aux.longitud,
                    aux.latitud,
                    aux.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    aux.id).getRight();
                if(aux.tarea){
                    if(aux.tarea.length > 0){
                        for(let tar of aux.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,aux.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

    async buscarNotasPorGeolocalizacion(latitud: number, longitud: number,idUsuario: string): Promise<Either<Error, Iterable<Nota>>> {

        const result = await this.repositorio.find({where: {carpeta: {usuario: {id: idUsuario}}, estado:Not('Eliminada'),latitud:latitud,longitud:longitud}, relations: ['carpeta']});
        if(result.length > 0){
            let notas: Nota[] = [];
            for(let nota of result){
                let n = Nota.create(nota.fechaCreacion,
                    nota.fechaModificacion,
                    nota.estado,
                    nota.titulo,
                    nota.cuerpo,
                    nota.carpeta.id,
                    nota.longitud,
                    nota.latitud,
                    nota.etiqueta.map(ima => {
                        return ima.id
                    }
                    ),
                    nota.id).getRight();
                if(nota.tarea){
                    if(nota.tarea.length > 0){
                        for(let tar of nota.tarea){
                            let t = Tarea.create(tar.nombre,tar.completada,tar.id,nota.id).getRight();
                            n.agregarTarea(t);
                        }
                    }
                }
                notas.push(n);
            }
            return Either.makeRight<Error,Nota[]>(notas);
        }
        else{
            return Either.makeLeft<Error,Nota[]>(new Error('No se encontraron notas'));
        }
    }

}