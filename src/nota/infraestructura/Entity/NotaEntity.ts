import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"
import { EtiquetaEntity } from "src/etiqueta/infraestructura/Entity/EtiquetaEntity"
import { TareaEntity } from "./TareaEntity"

@Entity()
export class NotaEntity {

    @PrimaryColumn()
    id: string

    @Column()
    titulo: string

    @Column()
    cuerpo: string

    @Column()
    fechaCreacion: Date

    @Column()
    fechaModificacion: Date

    @Column({nullable:true, type: 'double precision'})
    latitud?: number
    
    @Column({nullable:true, type: 'double precision'})
    longitud?: number
    
    @Column()
    estado: string

    @ManyToOne(() => CarpetaEntity,(carpeta) => carpeta.nota, { onDelete: 'CASCADE', nullable: false, onUpdate:'CASCADE' }	)
    carpeta: CarpetaEntity;


    @ManyToMany(() => EtiquetaEntity,{cascade:['remove','insert','update'],eager:true,nullable:true})
    @JoinTable({
        joinColumn: { name: 'nota_id', referencedColumnName: 'id' }, // Columna de clave foránea para la tabla de origen
        inverseJoinColumn: { name: 'etiqueta_id', referencedColumnName: 'id' }, // Columna de clave foránea para la tabla de destino
      })
    etiqueta: EtiquetaEntity[];

    @OneToMany(() => TareaEntity, (tarea) => tarea.nota,{cascade:['remove','insert','update'],eager:true,nullable:true})
    tarea: TareaEntity[];
}