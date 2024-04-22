import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm"

@Entity()
export class EtiquetaEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    nombre: string

    @ManyToMany(() => NotaEntity, (nota) => nota.etiqueta,{nullable:true})

    @JoinTable()
    nota: NotaEntity[];

    @ManyToOne(() => UsuarioEntity,(usuario) => usuario.etiqueta, { onDelete: 'CASCADE', nullable: false, onUpdate:'CASCADE' }	)
    usuario: UsuarioEntity;

}