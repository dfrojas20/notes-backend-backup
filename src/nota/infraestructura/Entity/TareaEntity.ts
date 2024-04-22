import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { NotaEntity } from "./NotaEntity";

@Entity()
export class TareaEntity {

    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    completada: boolean

    @ManyToOne(() => NotaEntity,(nota) => nota.tarea, { onDelete: 'CASCADE', nullable: false, onUpdate:'CASCADE' }	)
    nota: NotaEntity;

}