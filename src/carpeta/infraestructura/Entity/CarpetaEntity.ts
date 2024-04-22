import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity"
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"

@Entity()
export class CarpetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @Column()
    predeterminada: boolean

    @OneToMany(() => NotaEntity, (nota) => nota.carpeta,{cascade:['remove','insert','update'],eager:true,nullable:true})
    nota: NotaEntity[];

    @ManyToOne(() => UsuarioEntity,(usuario) => usuario.carpeta, { onDelete: 'CASCADE', nullable: false, onUpdate:'CASCADE' }	)
    usuario: UsuarioEntity;

}