import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity"
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity"
import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class UsuarioEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @Column({unique:true})
    correo: string

    @Column()
    clave: string

    @Column()
    fechaNacimiento: Date

    @Column()
    suscripcion: boolean

    @OneToMany(() => CarpetaEntity, (carpeta) => carpeta.usuario,{cascade:['remove'],eager:true,nullable:true})
    carpeta: CarpetaEntity[];

    @OneToMany(() => EtiquetaEntity, (etiqueta) => etiqueta.usuario,{cascade:['remove'],eager:true,nullable:true})
    etiqueta: EtiquetaEntity[];
    
}