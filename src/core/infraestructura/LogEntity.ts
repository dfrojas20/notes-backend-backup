import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class LogEntity{
    @PrimaryColumn()
    id: string

    @Column()
    mensaje: string

    @Column()
    resultado: string

    @Column()
    fecha: Date
}