import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm"


@Entity()
export class SuscripcionEntity {

    @PrimaryColumn()
    id: string

    @Column()
    fechaInicio: Date

    @Column()
    fechaFin: Date

    @Column()
    estado: string

    @OneToOne(() => UsuarioEntity,{ onDelete: 'CASCADE', nullable: false, onUpdate:'CASCADE' })
    @JoinColumn()
    usuario: UsuarioEntity;
}